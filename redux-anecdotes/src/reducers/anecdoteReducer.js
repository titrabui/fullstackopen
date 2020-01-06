import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'ADD_ANECDOTE':
      return [...state, action.data]
    case 'UPDATE_ANECDOTE':
      return state.map(a => a.id !== action.data.id ? a : action.data)
    default:
      return state
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const addAnecdote = anecdote => {
  return async dispatch => {
    const savedAnecdote = await anecdoteService.create(
      asObject(anecdote)
    )
    dispatch({
      type: 'ADD_ANECDOTE',
      data: savedAnecdote
    })
  }
}

export const voteAnecdote = id => {
  return async (dispatch, getstate) => {
    const anecdote = getstate().anecdotes.find(a => a.id === id)
    const updateObject = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    await anecdoteService.update(id, updateObject)
    dispatch({
      type: 'UPDATE_ANECDOTE',
      data: updateObject
    })
  }
}

export default reducer
