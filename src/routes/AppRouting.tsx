import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LogIn from '../pages/LogIn'
import Students from '../pages/Students'
import { auth, logOutFirebase } from '../services/credentials'
import '../styles/grid.css'
import Sidebar from '../components/pure/Sidebar'
import Footer from '../components/pure/Footer'

const AppRouting = () => {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    // console.log(auth.currentUser)

    if (auth.currentUser === null) setIsAuth(false)
    else setIsAuth(true)
  }, [location.href])

  const logOut = () => {
    logOutFirebase().then(() => {
      setIsAuth(false)
    })
  }

  return (
    <main className={'' + (isAuth && 'grid-main')}>
      {isAuth && <Sidebar logOut={logOut} />}
      <BrowserRouter>
        {isAuth ? (
          <Routes>
            <Route path='/alumnos-tkd/alumnos' element={<Students />} />
            <Route path='/*' element={<Navigate to={'/alumnos-tkd/inicio'} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path='/alumnos-tkd/' element={<LogIn setIsAuth={setIsAuth} />} />
            <Route path='/*' element={<Navigate to={'/alumnos-tkd'} />} />
          </Routes>
        )}
      </BrowserRouter>
      {isAuth && <Footer />}
    </main>
  )
}

export default AppRouting
