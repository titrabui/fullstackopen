import React from 'react';
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = (props) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter store={props.store}></Filter>
      <Notification store={props.store}></Notification>
      <AnecdoteList store={props.store}></AnecdoteList>
      <AnecdoteForm store={props.store}></AnecdoteForm>
    </div>
  )
}

export default App