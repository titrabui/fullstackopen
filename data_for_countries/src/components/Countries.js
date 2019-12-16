import React from 'react'
import CountryDetails from './CountryDetails'

const Countries = ({countries, handleFilter}) => {
  const showDetails = (word) => {
    handleFilter(word)
  }

  const row = () => {
    return countries.map(country => <li key={country.alpha3Code}><span>{country.name}</span> <button onClick={() => {showDetails(country.name)}}>Show</button></li>)
  }

  if (countries.length === 0) {
    return (
      <div>
        There is no any matches
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <CountryDetails country={countries[0]}></CountryDetails>
    )
  } else if (countries.length <= 10) {
    return (
      <div>
        {row()}
      </div>
    )
  } else {
    return (
      <div>
        Too many matches, specify another filters
      </div>
    )
  }
}

export default Countries
