import React, { FormEvent, useContext, useState } from 'react'
import { Button, FormControl, MenuItem, Paper, Select, SelectChangeEvent, TextField } from '@mui/material'
import { Graduations } from '../../data/data.ts'
import { addStudent, editStudent } from '../../services/http.ts'
import { LoadingContext } from '../../routes/AppRouting.tsx'
import { formatDate, formatStudent } from '../../services/services.ts'

const StudentsForm = ({
  studentToEdit,
  updateStudents,
}: {
  studentToEdit?: any
  updateStudents: () => Promise<void>
}) => {
  const studentCondition = studentToEdit !== undefined

  const [graduation, setGraduation] = useState(studentCondition ? studentToEdit.graduation : Graduations.WHITE)

  const setLoading = useContext(LoadingContext)

  const handleChange = (event: SelectChangeEvent) => {
    setGraduation(event.target.value as Graduations)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (setLoading) setLoading(true)
    const target = { ...e.target, graduation }
    if (studentCondition) {
      editStudent(formatStudent(target), studentToEdit.id).then(() =>
        updateStudents().finally(() => {
          if (setLoading) setLoading(false)
        }),
      )
    } else {
      addStudent(formatStudent(target)).then(() =>
        updateStudents().finally(() => {
          if (setLoading) setLoading(false)
        }),
      )
    }
  }
  return (
    <Paper className='max-w-80 py-5 px-10'>
      <h1 className='text-2xl font-bold mb-3'>Cargar alumno</h1>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <TextField
          defaultValue={studentCondition ? studentToEdit.name : ''}
          id='name'
          label='Nombre'
          variant='standard'
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          defaultValue={studentCondition ? studentToEdit.lastName : ''}
          id='lastName'
          label='Apellido'
          variant='standard'
          InputLabelProps={{ shrink: true }}
          required
        />
        <FormControl fullWidth>
          <Select labelId='graduations' value={graduation} onChange={handleChange} required>
            {Object.values(Graduations).map((graduation, i) => {
              return (
                <MenuItem key={i} value={graduation}>
                  {graduation}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <TextField
          defaultValue={studentCondition ? studentToEdit.phone : ''}
          id='phone'
          type='number'
          label='Teléfono'
          variant='standard'
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          defaultValue={studentCondition ? formatDate(studentToEdit.birthDate, true) : ''}
          label='Nacimiento'
          id='birthDate'
          type='date'
          variant='standard'
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          defaultValue={studentCondition ? formatDate(studentToEdit.startDate, true) : ''}
          label='Inicio'
          id='startDate'
          type='date'
          variant='standard'
          InputLabelProps={{ shrink: true }}
        />

        <div className='flex flex-col mt-5'>
          <Button type='submit' variant='contained'>
            {studentCondition ? 'Confirmar' : 'Añadir'}
          </Button>
        </div>
      </form>
    </Paper>
  )
}

export default StudentsForm
