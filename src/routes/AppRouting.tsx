import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LogIn from '../pages/LogIn'
import { auth, logOutFirebase } from '../services/credentials'
import '../styles/grid.css'
import Menu from '../components/pure/Menu'
import Footer from '../components/pure/Footer'
import Load from '../components/pure/Load'
import { Modal } from '@mui/material'
import MenuMobile from '../components/pure/MenuMobile'
import { CalendarMonth, ContactEmergency, Home, PeopleAlt } from '@mui/icons-material'
import Students from '../pages/Students'
import Contacts from '../pages/Contacts'

export const LoadingContext = createContext<null | Dispatch<SetStateAction<boolean>>>(null)

const navElements = [
  { label: 'Inicio', icon: <Home /> },
  { label: 'Alumnos', icon: <PeopleAlt /> },
  { label: 'Contactos', icon: <ContactEmergency /> },
  { label: 'Cuotas', icon: <CalendarMonth /> },
]

const AppRouting = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState('Inicio')

  useEffect(() => {
    if (auth.currentUser === null) setIsAuth(false)
    else setIsAuth(true)
  }, [location.href])

  const logOut = () => {
    logOutFirebase().then(() => {
      setIsAuth(false)
    })
  }

  return (
    <LoadingContext.Provider value={setIsLoading}>
      <main className={'' + (isAuth && 'grid-main')}>
        {/* M O D A L E S */}
        <Modal open={isLoading}>
          <div className='dots-container'>
            <Load />
          </div>
        </Modal>

        <BrowserRouter>
          {/* M E N U S */}
          {isAuth && (
            <Menu
              logOut={logOut}
              elements={navElements}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          )}
          {isAuth && (
            <MenuMobile
              logOut={logOut}
              elements={navElements}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          )}

          {/* R U T A S */}
          {isAuth ? (
            <Routes>
              <Route path='/inicio' element={<h1>INICIO</h1>} />
              <Route path='/alumnos' element={<Students />} />
              <Route path='/contactos' element={<Contacts />} />
              <Route path='/cuotas' element={<h1>CUOTAS</h1>} />
              <Route path='*' element={<Navigate to={'/contactos'} />} />
              {/* <Route path='*' element={<Navigate to={'/inicio'} />} /> */}
            </Routes>
          ) : (
            <Routes>
              <Route path='/' element={<LogIn setIsAuth={setIsAuth} />} />
              <Route path='*' element={<Navigate to={'/'} />} />
            </Routes>
          )}

          {/* F O O T E R */}
          {isAuth && <Footer />}
        </BrowserRouter>
      </main>
    </LoadingContext.Provider>
  )
}

export default AppRouting
