import './App.css'
import Login from './pages/login'
import Groups from './pages/groups'
import Record from './pages/record'
import { useState } from 'react'

function App() {

  const [login, setLogin] = useState(false)
  const [record, setOpenRecord] = useState(false)
  
  return (
    <>
      {!login ? (<Login
                  setLogin={setLogin}/>) :
                (!record ? <Groups
                            setOpenRecord={setOpenRecord}/> :
                  <Record/>
                )
      }
    </>
  )
}

export default App
