import { useState } from 'react'
import './App.css'
import { BrowserRouter } from "react-router-dom";
import { Hero } from './components';
const App = () => {


  return (
  <BrowserRouter>
  <div className='bg-tertiary'>
    <Hero/>
  </div>
   
  </BrowserRouter>
  )
}

export default App
