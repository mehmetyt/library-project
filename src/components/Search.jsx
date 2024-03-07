import React, { useContext } from 'react'
import '../assets/styles/search.scss'
import DataContext from '../context/DataContext'

const Search = () => {
  const{dispatch}=useContext(DataContext);
  return (
    <div className='form' >
      <input className='form-input' type="search" placeholder="Arama yapın..." onChange={(e)=>dispatch({type:'SEARCH',payload:e.target.value})} />
    </div>
  )
}

export default Search