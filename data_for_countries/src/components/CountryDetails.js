import React, { useEffect, useState } from 'react'
import { getWeatherByLocation } from '../services/weather'

const CountryDetails = ({country}) => {
  const [currentWeather, setCurrentWeather] = useState({})
  useEffect(() => {
    getWeatherByLocation(country.capital).then(response => {
      setCurrentWeather(response.data.current)
    })
  }, [country])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
      <h2>Flag</h2>
      <img style={{height: '120px'}} alt='' src={country.flag}></img>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature: {currentWeather && currentWeather.temperature} Celcius</p>
      <img style={{height: '100px'}} alt='' src={currentWeather && currentWeather.weather_icons && currentWeather.weather_icons[0]}></img>
      <p>Wind: {currentWeather && currentWeather.wind_speed} kph direction {currentWeather && currentWeather.wind_dir}</p>
    </div>
  )
}

export default CountryDetails
