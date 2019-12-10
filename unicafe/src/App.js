import React, { useState } from 'react'
import Button from './Button'
import Statistics from './Statistics'
import './App.css'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveFeedback = (type) => {
    if (type === 'good') {
      setGood(good + 1)
    } else if (type === 'neutral') {
      setNeutral(neutral + 1)
    } else {
      setBad(bad + 1)
    }
  }

  return (
    <div style={{marginLeft: '2em'}}>
      <h1>Unicafe Feedback</h1>
      <Button handleClick={() => giveFeedback('good') } text="Good"/>
      <Button handleClick={() => giveFeedback('neutral') } text="Neutral"/>
      <Button handleClick={() => giveFeedback('bad') } text="Bad"/>

      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App;
