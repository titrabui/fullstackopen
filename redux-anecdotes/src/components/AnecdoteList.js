import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes

  useEffect(() => {
    props.initAnecdotes()
  }, [])

  const vote = (id) => {
    console.log('vote', id)

    const targetAnecdote = anecdotes.find(a => a.id === id)
    props.voteAnecdote(id)
    props.setNotification(`Voted ${targetAnecdote.content}`)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes
    .filter(a => a.content.toLowerCase().indexOf(filter) > -1)
    .sort((a, b) => a.votes <= b.votes ? 1 : -1)
}

const mapStateToProps = (state) => {
  return {
    anecdotes: anecdotesToShow(state),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  initAnecdotes,
  voteAnecdote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
