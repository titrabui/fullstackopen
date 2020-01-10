import { useState } from 'react'
import axios from 'axios'

export const useField = ({ id, type }) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)    
  }

  const reset = () => {
    setValue('')
  }

  return {
    props: {
      id,
      type,
      value,
      onChange
    },
    reset
  }
}

export const useResource = (baseUrl) => {
  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
  }

  const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }

    const request = await axios.post(baseUrl, newObject, config)
    return request.data
  }

  const update = async (id, newObject) => {
    const config = {
      headers: { Authorization: token },
    }

    const request = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return request.data
  }

  const remove = async id => {
    const config = {
      headers: { Authorization: token },
    }

    const request = await axios.delete(`${baseUrl}/${id}`, config)
    return request.data
  }

  return { getAll, create, update, remove, setToken }
}
