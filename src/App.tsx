import './App.css'
import Login from './pages/login'
import Groups from './pages/groups'
import Record from './pages/record'
import { useState } from 'react'
import StudentsList from './pages/studentsList'
import Footer from './components/footer'

function App() {

  const [login, setLogin] = useState(false)
  const [record, setOpenRecord] = useState(false)
  const [list, setOpenList] = useState(false)
  
  return (
    <>
      {!login ? (<Login
                  setLogin={setLogin}/>) :
                (!record ? (<Groups
                            setOpenRecord={setOpenRecord}/>) :
                            (!list ? (<Record
                                      setOpenRecord={setOpenRecord}
                                      setOpenList={setOpenList}/>) :
                            (<StudentsList
                            setOpenList={setOpenList}/>))
                )
      }
      <Footer/>
    </>
  )
}

export default App
