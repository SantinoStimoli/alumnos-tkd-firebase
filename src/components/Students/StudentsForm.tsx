import React, { FormEvent, useContext, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField } from '@mui/material'
import { Graduations } from '../../data/data.ts'
import { addStudent, editStudent } from '../../services/services.ts'
import { LoadingContext } from '../../routes/AppRouting.tsx'
import { formatDate, formatStudent } from '../../utils/utils.ts'

const StudentsForm = ({
  studentToEdit,
  updateStudents,
}: {
  studentToEdit?: any
  updateStudents: () => Promise<void>
}) => {
  const isViewMode = studentToEdit !== undefined

  const [graduation, setGraduation] = useState(isViewMode ? studentToEdit.graduation : Graduations.WHITE)
  const [isEditMode, setIsEditMode] = useState(false)

  const setLoading = useContext(LoadingContext)

  const handleChange = (event: SelectChangeEvent) => {
    setGraduation(event.target.value as Graduations)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading && setLoading(true)
    if (isViewMode) {
      editStudent(formatStudent({ ...e.target, graduation }), studentToEdit.id).then(() =>
        updateStudents().finally(() => {
          setLoading && setLoading(false)
          setIsEditMode(false)
        }),
      )
    } else {
      addStudent(formatStudent({ ...e.target, graduation })).then(() =>
        updateStudents().finally(() => {
          setLoading && setLoading(false)
        }),
      )
    }
  }

  return (
    <Paper className='modal-content'>
      <h1>{isViewMode ? 'Editar alumno' : 'Cargar alumno'}</h1>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <div className='sm:flex gap-2'>
          <TextField
            disabled={isViewMode && !isEditMode}
            fullWidth
            defaultValue={isViewMode ? studentToEdit.name : ''}
            id='name'
            label='Nombre'
            variant='standard'
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            disabled={isViewMode && !isEditMode}
            fullWidth
            defaultValue={isViewMode ? studentToEdit.lastName : ''}
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
            disabled={isViewMode && !isEditMode}
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
          disabled={isViewMode && !isEditMode}
          defaultValue={isViewMode ? studentToEdit.phone : ''}
          id='phone'
          type='number'
          label='Teléfono'
          variant='standard'
          InputLabelProps={{ shrink: true }}
        />
        <div className='sm:flex gap-2'>
          <TextField
            disabled={isViewMode && !isEditMode}
            fullWidth
            defaultValue={isViewMode ? formatDate(studentToEdit.birthDate, true) : ''}
            label='Nacimiento'
            id='birthDate'
            type='date'
            variant='standard'
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            disabled={isViewMode && !isEditMode}
            fullWidth
            defaultValue={isViewMode ? formatDate(studentToEdit.startDate, true) : ''}
            label='Inicio'
            id='startDate'
            type='date'
            variant='standard'
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <TextField
          disabled={isViewMode && !isEditMode}
          fullWidth
          label='Anotaciones'
          multiline
          defaultValue={isViewMode ? studentToEdit.annotations : ''}
          rows={3}
        />

        <div className='flex flex-col mt-5'>
          <div className='flex gap-3 '>
            {isViewMode && (
              <Button fullWidth onClick={() => setIsEditMode(!isEditMode)} type='button' variant='contained'>
                Editar
              </Button>
            )}
            <Button fullWidth type='submit' variant='contained'>
              {isViewMode ? 'Confirmar' : 'Añadir'}
            </Button>
          </div>
        </div>
      </form>
    </Paper>
  )
}

export default StudentsForm
