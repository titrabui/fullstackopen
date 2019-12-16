import axios from 'axios'

const API_ACCESS_KEY = '9b231de14f770bdcef66a06641352e22'
const API_BASE_URL = 'http://api.weatherstack.com/current'

export function getWeatherByLocation (location) {
  return axios.get(`${API_BASE_URL}?access_key=${API_ACCESS_KEY}&query=${location}`)
}
