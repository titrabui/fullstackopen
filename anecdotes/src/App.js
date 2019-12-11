import React, { useState } from 'react';
import Button from './Button';
import './App.css';

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

  const setAnecdote = () => {
    setSelected(getRandomInt(props.anecdotes.length - 1))
  }

  const voteAnecdote = () => {
    const copyVotes = [...votes]
    copyVotes[selected]+=1
    setVotes(copyVotes)
  }

  const maxVoteAnecdote = () => {
    const maxVoteId = votes.indexOf(Math.max(...votes))
    return props.anecdotes[maxVoteId]
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  return (
    <div style={{marginLeft: '2em'}}>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} vote</p>
      <Button handleClick={() => voteAnecdote()} text="Vote"></Button>
      <Button handleClick={() => setAnecdote()} text="Next anecdote"></Button>

      <h1>Anecdote with the most votes</h1>
      <p>{maxVoteAnecdote()}</p>
      <p>has {Math.max(...votes)} vote</p>
    </div>
  )
}

export default App;
