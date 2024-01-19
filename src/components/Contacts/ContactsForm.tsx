import React, { FormEvent, useContext } from 'react'
import { Button, Paper, TextField } from '@mui/material'
import { addStudent } from '../../services/http.ts'
import { LoadingContext } from '../../routes/AppRouting.tsx'
import { formatStudent } from '../../services/services.ts'

const StudentsForm = ({ updateStudents }: { updateStudents: () => void }) => {
  const setLoading = useContext(LoadingContext)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (setLoading) setLoading(true)
    const target = { ...e.target }
    addStudent(formatStudent(target))
      .then(() => updateStudents())
      .finally(() => {
        if (setLoading) setLoading(false)
      })
  }
  return (
    <Paper className='max-w-80 py-5 px-10'>
      <h1 className='text-2xl font-bold mb-3'>Cargar Contacto</h1>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <TextField id='name' label='Nombre' variant='standard' InputLabelProps={{ shrink: true }} required />
        <TextField id='lastName' label='Apellido' variant='standard' InputLabelProps={{ shrink: true }} required />
        <TextField id='phone' type='number' label='Teléfono' variant='standard' InputLabelProps={{ shrink: true }} />

        <div className='flex flex-col mt-5'>
          <Button type='submit' variant='contained'>
            Añadir
          </Button>
        </div>
      </form>
    </Paper>
  )
}

export default StudentsForm
