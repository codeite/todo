
import actions from './actions'

export const serverMap = action => {
  if (!action) return;

  switch (action.type) {
    case actions.addTodo: return {
      success: actions.todoFromServer.type
    }
  }
}