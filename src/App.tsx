import './App.css'
import Login from './pages/login'
import Groups from './pages/groups'
import { useState } from 'react'

function App() {

  const [login, setLogin] = useState(false)

  
  return (
    <>
      {!login ? (<Login
        setLogin={setLogin}/>) :
        (<Groups/>)
      }
    </>
  )
}

export default App
