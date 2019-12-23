import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import HeaderMessage from './components/HeaderMessage'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchText, setSearchText] = useState('')
  const [message, setMessage] = useState(null)

  const addNewPerson = (person) => {
    if (isAlreadyAdded(person)) {
      const updateConfirm = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`);
      if (updateConfirm) {
        const updateId = persons.find(item => item.name === person.name).id
        personService
        .update(updateId, person)
        .then((updatedPerson) => {
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson ))
          setHeaderMessage({ message: `Updated ${updatedPerson.name} with number ${updatedPerson.number}`, type: 'success' })
        })
        .catch(error => {
          setHeaderMessage({ message: error.response.data.error, type: 'error' })
        })
      }
    } else {
      personService
        .create(person)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson))
          setHeaderMessage({ message: `Added ${person.name} to the phone book`, type: 'success' })
        })
        .catch(error => {
          setHeaderMessage({ message: error.response.data.error, type: 'error' })
        })
    }
  }

  const deletePerson = (personId) => {
    personService
      .remove(personId)
      .then(() => {
        setPersons(persons.filter(person => person.id !== personId ))
        setHeaderMessage({ message: `Deleted success`, type: 'success' })
      })
  }

  const isAlreadyAdded = (person) => {
    return persons.some(item => item.name === person.name)
  }

  const filterNumber = (keyWord) => {
    setSearchText(keyWord)
  }

  const shownPersons = () => {
    return (persons || []).filter(person => person.name.indexOf(searchText) > -1)
  }

  const setHeaderMessage = (messageObject) => {
    setMessage(messageObject)
    if (messageObject.type === 'success') {
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    const getAllPersons = () => {
      personService
        .getAll()
        .then((allPersons) => {
          setPersons(allPersons)
        }).catch(() => {
          setHeaderMessage({ message: 'Seems have problem with phone book server!!!', type: 'error' })
        })
    }

    getAllPersons()
  }, [])

  return (
    <div style={{marginLeft: '2em'}}>
      <h1>Phonebook</h1>
      <HeaderMessage error={message}></HeaderMessage>
      <Filter persons={persons} handleFilter={filterNumber}></Filter>
      <h2>Add new Number</h2>
      <PersonForm handleSubmit={addNewPerson}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={shownPersons()} handleDelete={deletePerson}></Persons>
    </div>
  )
}

export default App
