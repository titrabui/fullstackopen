import React from 'react'
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import feedbackReducer from './reducers/feedbackReducer'
import Button from './Button'
import Statistics from './Statistics'
import './App.css'

const store = createStore(feedbackReducer)
let feedbacks = store.getState()

const App = () => {
  const giveFeedback = type => {
    store.dispatch({ type })
  }

  return (
    <div style={{marginLeft: '2em'}}>
      <h1>Unicafe Feedback</h1>
      <Button handleClick={() => giveFeedback('GOOD')} text="Good"/>
      <Button handleClick={() => giveFeedback('NEUTRAL')} text="Neutral"/>
      <Button handleClick={() => giveFeedback('BAD')} text="Bad"/>

      <Statistics feedbacks={feedbacks}></Statistics>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

store.subscribe(() => {
  feedbacks = store.getState()
  renderApp()
})

export default App;
