import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes

  const vote = (id) => {
    console.log('vote', id)
    props.voteAnecdote(id)

    const targetAnecdote = anecdotes.find(a => a.id === id)
    props.setNotification(`Voted ${targetAnecdote.content}`)

    setTimeout(() => {
      props.removeNotification()
    }, 5000)
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
  voteAnecdote,
  setNotification,
  removeNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
