import React from 'react'

const Persons = ({persons, handleDelete}) => {
  const deletePerson = (person) => {
    const confirmDelete = window.confirm(`Delete ${person.name}?`)
    if (confirmDelete) {
      handleDelete(person.id)
    }
  }

  const row = () => {
    return persons.map(person => <tr key={person.id}><th>{person.name}</th><td>{person.number}</td><td><button onClick={() => deletePerson(person)}>Delete</button></td></tr>)
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
