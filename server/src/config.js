require('dotenv').config()
const conf = require('sp-conf')

const endsWithSlash = /\/$/

const myconfig = {
  port: conf.readNumber('PORT', {defaultValue: 12010}),
  secret: conf.readPassword('SECRET'),
  database: conf.readUrl('DB_URL', {defaultValue: 'http://localhost:5984/', validator: endsWithSlash})
}

if (conf.missingEnvVars) {
  console.error('Some required env vars were missing. Terminating')
  process.exit(1)
}

conf.makeClonableAndDeepFreeze(myconfig)

module.exports = myconfig
