const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'ADD_FILTER':
      return action.filter  
    default:
      return state
  }
}

export const addFilter = (filter) => {
  return {
    type: 'ADD_FILTER',
    filter
  }
}

export default filterReducer
