import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import './App.css'

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

  const addNewPerson = (person) => {
    setPersons(persons.concat(person))
    alert(`Added ${person.name} with number ${person.number} to Phone Book`)
  }

  const filterNumber = (keyWord) => {
    setSearchText(keyWord)
  }

  const shownPersons = () => {
    return (persons || []).filter(person => person.name.indexOf(searchText) > -1)
  }

  return (
    <div style={{marginLeft: '2em'}}>
      <h2>Phonebook</h2>
      <Filter persons={persons} handleFilter={filterNumber}></Filter>
      <h2>Add new Number</h2>
      <PersonForm handleSubmit={addNewPerson}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={shownPersons()}></Persons>
    </div>
  )
}

export default App
