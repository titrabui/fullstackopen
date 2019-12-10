import React from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const average = ((good + (bad * -1)) / 3).toFixed(2)
  const all = good + neutral + bad
  const positive = ((good * 100) / all).toFixed(2);

  if (all === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <tr>
            <th>Good</th>
            <td>{good}</td>
          </tr>
          <tr>
            <th>Neutral</th>
            <td>{neutral}</td>
          </tr>
          <tr>
            <th>Bad</th>
            <td>{bad}</td>
          </tr>
          <tr>
            <th>All</th>
            <td>{all}</td>
          </tr>
          <tr>
            <th>Average</th>
            <td>{average}</td>
          </tr>
          <tr>
            <th>Positive</th>
            <td>{positive}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics;
