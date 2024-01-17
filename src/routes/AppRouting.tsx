import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LogIn from '../pages/LogIn'
import NotFound from '../pages/NotFound'
import Home from '../pages/Home'
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
            <Route path='/' element={<Navigate to={'/inicio'} />} />
            <Route path='/inicio' element={<Home />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route path='/' element={<LogIn setIsAuth={setIsAuth} />} />
            <Route path='/inicio' element={<Navigate to={'/'} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        )}
      </BrowserRouter>
      {isAuth && <Footer />}
    </main>
  )
}

export default AppRouting
