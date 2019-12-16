import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'
import './App.css'

const App = () => {
  const [countries, SetCountries] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        SetCountries(response.data)
      })
  }, [])

  const filterCountry = (keyWord) => {
    setSearchText(keyWord)
  }

  const shownCountries = () => {
    return (countries || []).filter(country => country.name.indexOf(searchText) > -1)
  }

  return (
    <div style={{marginLeft: '2em'}}>
      <h2>Data for Countries</h2>
      <Filter countries={countries} handleFilter={filterCountry}></Filter>
      <Countries countries={shownCountries()} handleFilter={filterCountry}></Countries>
    </div>
  )
}

export default App
