import React from 'react'

const Filter = ({handleFilter}) => {
  const searchPerson = (event) => {
    handleFilter(event.target.value)
  }

  return (
    <div>
      Search: <input onChange={searchPerson}/>
    </div>
  )
}

export default Filter
