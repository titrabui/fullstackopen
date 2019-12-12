import React, { useState } from 'react'

const PersonForm = ({handleSubmit}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    handleSubmit({ name: newName, number: newNumber })
    setNewName('')
    setNewNumber('')
  }

  const addNewName = (event) => {
    setNewName(event.target.value)
  }

  const addNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={addNewName}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={addNewNumber}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
