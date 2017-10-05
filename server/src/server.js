const http = require('http')
const fetch = require('node-fetch')
const authClient = require('@codeite/auth-client')
const config = require('./config')
const TodoServer = require('./TodoServer')
const UserStore = require('./UserStore')
const todoServer = new TodoServer(new UserStore(config.database, fetch))
const WebSocket = require('ws')

WebSocket.prototype.onWebSocketOpen = function onWebSocketOpen(ws, req) {
  ws.upgradeReq = req
}

const authClientInstance = authClient('todo_user', config.SECRET, {
  rejector: res => reason => {
    res.statusCode = 401
    res.statusMessage = reason
    res.write(reason)
    res.end()
  }
})

const server = http.createServer((req, res) => {
  console.log('req.headers:', req.headers)
  const next = () => {
    createApp()(req, res)
  }
  if (req.url.startsWith('/login')) {
    next()
  } else {
    authClientInstance(req, res, next)
  }
})

const wss = new WebSocket.Server({ server })


wss.on('connection', (ws, req) => {
  // console.log('connection:', ws)
  //console.log("connection request cookie: ", req.headers);

  const username = (
    (req.headers.cookie||'')
      .split('; ')
      .find(x => x.startsWith('username=')) || 'username='
  )
  .substr('username='.length)
  console.log('username:', username)

  ws.on('message', message => {
    console.log('received:', message)

    const event = JSON.parse(message)
    processSocketEvent(ws, username, event)
  })

  //ws.send('something')
});

server.listen(config.port, error => console.log(error || `Server listening on port ${config.port}`)); //the server object listens on port config.port

//create a server object:
function createApp() {
  return (req, res) => {


    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', req.headers.origin ? 'true' : 'false')
    if (req.method === 'OPTIONS') {
      res.setHeader('Allow', 'GET,POST,OPTIONS')
      res.end()
      return
    }

    // const username = (
    //     (req.headers.cookie||'')
    //       .split('; ')
    //       .find(x => x.startsWith('username=')) || 'username='
    //   )
    //   .substr('username='.length)
    //console.log('req.userId:', req.userId)
    const username = req.userId

    if (req.url.startsWith ('/login')) {
      try {
        const auth = JSON.parse(decodeURIComponent(req.url.substr(req.url.indexOf('?')+1)))

        res.setHeader('Set-Cookie', 'username=' + auth.username)
        res.setHeader('Set-Cookie', 'todo_user=' + authClient.sign(auth.username, config.SECRET))
        res.write('Logged in as: ' + auth.username)
        res.end()
      } catch (ex) {
        res.setHeader('Content-Type', 'text/html')
        res.write(`To log in: <a href='/login?{"username":"sam"}'>/login?{"username":"sam"}</a>`)
        res.end()
      }
      return
    }

    if (req.url.startsWith ('/who')) {
      res.write('Hello: '+username)
      res.end()
      return
    }

    if (!req.url.startsWith('/todo-redux')) {
      return error(res, 'only `/todo-redux` is valid')
    }

    const user = (req.headers.cookies || '')

    if (req.method === 'GET') {
      try {
        const event = JSON.parse(decodeURIComponent(req.url.substr(req.url.indexOf('?')+1)))
        processEvent(res, username, event)
      } catch (ex) {
        return error(res, ex+'')
      }
    } else if (req.method === 'POST') {
      const bodyBuffer = [];
      req.on('error', (err) => {
        return error(res, 'error in body')
      }).on('data', (chunk) => {
        bodyBuffer.push(chunk);
      }).on('end', () => {
        const event = JSON.parse(decodeURIComponent(Buffer.concat(bodyBuffer).toString()))
        processEvent(res, username, event)
      });
    } else {
      return error(res, 'only GET and POST supported')
    }
  }
}

function error (res, msg) {
  console.error('Error: ', msg)
  if (res.send) {
    res.sent(msg)
  } else {
    res.statusCode = 400
    res.write('Not supported: ' + msg); //write a response to the client
    res.end(); //end the response
  }
}

function processEvent (res, username, event) {
  if (!event.type) {
    return error(res, 'event does not have "type"')
  }

  todoServer.onAction(event, username)
    .then(result => {
      if (Array.isArray(result)) {
        const response = {
          message: 'Process successfully',
          events: result
        }
        res.write(JSON.stringify(response))
        res.end()
      } else {
        res.write(JSON.stringify({message:'No action required', events:[]}))
        res.end()
      }
    })
    .catch(err => {
      console.error('err:', err)
      error(res, err+'')
    })
}

function processSocketEvent (ws, username, event) {
  console.log('processSocketEvent:', username, event)
  todoServer.onAction(event, username)
    .then(result => {
      if (Array.isArray(result)) {
        const response = {
          message: 'Process successfully',
          events: result
        }
        ws.send(JSON.stringify(response))
      } else {
        ws.send(JSON.stringify({message:'No action required', events:[]}))
      }
    })
    .catch(err => {
      console.error('err:', err)
      error(ws, err+'')
    })
}
