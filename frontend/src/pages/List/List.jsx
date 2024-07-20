import React from 'react'
import './List.css'
import CardDisplay from '../../components/CardDisplay/CardDisplay'
import Sidebar from '../../components/Sidebar/Sidebar'

const List = () => {
  return (
    <div className='list'>
      {/* <Sidebar/> */}
      <CardDisplay/>
    </div>
  )
}

export default List