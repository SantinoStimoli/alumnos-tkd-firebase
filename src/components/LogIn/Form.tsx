import React, { Dispatch, FormEvent, SetStateAction, useContext, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, InputAdornment, Link, TextField } from '@mui/material'
import { logInFirebase, registerFirebase } from '../../services/credentials'
import { LoadingContext } from '../../routes/AppRouting'

const LogInForm = ({ setIsAuth }: { setIsAuth: Dispatch<SetStateAction<boolean>> }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [register, setRegister] = useState(false)

  const setLoading = useContext(LoadingContext)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (setLoading) setLoading(true)
    const target = e.target as typeof e.target & {
      mail: { value: string }
      password: { value: string }
    }

    if (register) {
      await registerFirebase(target.mail.value, target.password.value)
        .then(() => {
          setIsAuth(true)
        })
        .finally(() => {
          if (setLoading) setLoading(false)
        })
    } else {
      await logInFirebase(target.mail.value, target.password.value)
        .then(() => {
          setIsAuth(true)
        })
        .finally(() => {
          if (setLoading) setLoading(false)
        })
    }
  }

  return (
    <section className='rounded border p-5 py-7  min-w-[300px] max-w-[500px] m-auto'>
      <h1>{register ? 'Registrarse' : 'Iniciar sesión'}</h1>

      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <TextField
          defaultValue={'santinostimoli@gmail.com'}
          required
          id='mail'
          label='Nombre de usuario'
          variant='standard'
          type='email'
        />
        <TextField
          defaultValue={'123123'}
          required
          id='password'
          label='Contraseña'
          variant='standard'
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment
                className='cursor-pointer'
                onClick={() => setShowPassword(!showPassword)}
                position='start'
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </InputAdornment>
            ),
          }}
        />
        <div className='mt-3 flex flex-col gap-1'>
          <Button variant='contained' type='submit'>
            Enviar
          </Button>
          <p className='flex gap-1'>
            {register ? 'Ya tienes una cuenta?' : 'No tienes una cuenta?'}
            <Link className='select-none cursor-pointer' onClick={() => setRegister(!register)}>
              {register ? 'Iniciar sesión' : 'Registrarse'}
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default LogInForm
