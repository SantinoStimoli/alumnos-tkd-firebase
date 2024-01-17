import React, { Dispatch, SetStateAction } from 'react'
import LogInForm from '../components/LogIn/Form'

const LogIn = ({ setIsAuth }: { setIsAuth: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <main className='h-screen flex'>
      <LogInForm setIsAuth={setIsAuth} />
    </main>
  )
}

export default LogIn
