import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LogIn from '../pages/LogIn'
import Students from '../pages/Students'
import { auth, logOutFirebase } from '../services/credentials'
import '../styles/grid.css'
import Menu from '../components/pure/Menu'
import Footer from '../components/pure/Footer'
import Load from '../components/pure/Load'
import { Modal } from '@mui/material'
import MenuMobile from '../components/pure/MenuMobile'
import { CalendarMonth, Home, PeopleAlt } from '@mui/icons-material'

export const LoadingContext = createContext<null | Dispatch<SetStateAction<boolean>>>(null)

const navElements = [
  { label: 'Inicio', icon: <Home /> },
  { label: 'Alumnos', icon: <PeopleAlt /> },
  { label: 'Cuotas', icon: <CalendarMonth /> },
]

const AppRouting = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
          <Load />
        </Modal>

        {/* M E N U S */}
        {isAuth && <Menu logOut={logOut} elements={navElements} />}
        {isAuth && <MenuMobile logOut={logOut} elements={navElements} />}

        {/* R U T A S */}
        <BrowserRouter>
          {isAuth ? (
            <Routes>
              <Route path='/alumnos-tkd/alumnos' element={<Students />} />
              <Route path='*' element={<Navigate to={'/alumnos-tkd/alumnos'} />} />
            </Routes>
          ) : (
            <Routes>
              <Route path='/alumnos-tkd/' element={<LogIn setIsAuth={setIsAuth} />} />
              <Route path='*' element={<Navigate to={'/alumnos-tkd'} />} />
            </Routes>
          )}
        </BrowserRouter>

        {/* F O O T E R */}
        {isAuth && <Footer />}
      </main>
    </LoadingContext.Provider>
  )
}

export default AppRouting
