import React from 'react'

const Persons = ({persons}) => {
  const row = () => {
    return persons.map(person => <tr key={person.number}><th>{person.name}</th><td>{person.number}</td></tr>)
  }

  if (persons.length === 0) {
    return (
      <div>
        There is no phone book to show
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          {row()}
        </tbody>
      </table>
    </div>
  )
}

export default Persons
