import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    getAllPersons()
  }, [])

  const getAllPersons = () => {
    personService
      .getAll()
      .then((allPersons) => {
        setPersons(allPersons)
      })
  }

  const addNewPerson = (person) => {
    // check already added

    personService
      .create(person)
      .then((createdPerson) => {
        alert(`Added ${createdPerson.name} with number ${createdPerson.number} to Phone Book`)
        setPersons(persons.concat(createdPerson))
      })
  }

  const isAlreadyAdded = (person) => {
    return persons.find()
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
