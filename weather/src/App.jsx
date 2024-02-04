import { useState } from 'react'
import { CiSearch } from "react-icons/ci";

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='conatiner'>
      <div className='input-container'>
        <input type='text' 
        className='cityInput'
        placeholder='Search City' 
      />
        <div className='search-icon'>
        <CiSearch />
        </div>
      </div>
    </div>
      
    </>
  )
}

export default App
