import React from 'react'

const Filter = ({handleFilter}) => {
  const searchCountries = (event) => {
    handleFilter(event.target.value)
  }

  return (
    <div>
      Find countries: <input onChange={searchCountries}/>
    </div>
  )
}

export default Filter
