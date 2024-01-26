import React, { FormEvent, useContext, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField } from '@mui/material'
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
  const [edit, setEdit] = useState(true)

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
          setEdit(true)
        }),
      )
    } else {
      addStudent(formatStudent(target)).then(() =>
        updateStudents().finally(() => {
          if (setLoading) setLoading(false)
          setEdit(true)
        }),
      )
    }
  }
  return (
    <Paper className='max-w-80 py-5 px-10'>
      <h1 className='text-3xl text-center font-bold mb-5'>{studentCondition ? 'Editar alumno' : 'Cargar alumno'}</h1>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <div className='sm:flex gap-2'>
          <TextField
            disabled={studentCondition && edit}
            fullWidth
            defaultValue={studentCondition ? studentToEdit.name : ''}
            id='name'
            label='Nombre'
            variant='standard'
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            disabled={studentCondition && edit}
            fullWidth
            defaultValue={studentCondition ? studentToEdit.lastName : ''}
            id='lastName'
            label='Apellido'
            variant='standard'
            InputLabelProps={{ shrink: true }}
            required
          />
        </div>
        <FormControl fullWidth>
          <InputLabel id='graduations'>Categoría</InputLabel>
          <Select
            disabled={studentCondition && edit}
            labelId='graduations'
            label='Categoría'
            value={graduation}
            onChange={handleChange}
            required
          >
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
          disabled={studentCondition && edit}
          defaultValue={studentCondition ? studentToEdit.phone : ''}
          id='phone'
          type='number'
          label='Teléfono'
          variant='standard'
          InputLabelProps={{ shrink: true }}
        />
        <div className='sm:flex gap-2'>
          <TextField
            disabled={studentCondition && edit}
            fullWidth
            defaultValue={studentCondition ? formatDate(studentToEdit.birthDate, true) : ''}
            label='Nacimiento'
            id='birthDate'
            type='date'
            variant='standard'
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            disabled={studentCondition && edit}
            fullWidth
            defaultValue={studentCondition ? formatDate(studentToEdit.startDate, true) : ''}
            label='Inicio'
            id='startDate'
            type='date'
            variant='standard'
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <TextField
          disabled={studentCondition && edit}
          fullWidth
          label='Anotaciones'
          multiline
          defaultValue={studentCondition ? studentToEdit.annotations : ''}
          rows={3}
        />

        <div className='flex flex-col mt-5'>
          <div className='flex gap-3 '>
            {studentCondition && (
              <Button fullWidth onClick={() => setEdit(!edit)} type='button' variant='contained'>
                Editar
              </Button>
            )}
            <Button fullWidth type='submit' variant='contained'>
              {studentCondition ? 'Confirmar' : 'Añadir'}
            </Button>
          </div>
        </div>
      </form>
    </Paper>
  )
}

export default StudentsForm
