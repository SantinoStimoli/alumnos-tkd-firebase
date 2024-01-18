import React from 'react'
import { Button, FormControl, MenuItem, Paper, Select, SelectChangeEvent, TextField } from '@mui/material'
import { Graduations } from '../../data/data.ts'
import { addStudent } from '../../services/http.ts'

const StudentsForm = ({ updateStudents }: { updateStudents: () => void }) => {
  const [graduation, setGraduation] = React.useState(Graduations.WHITE)

  const handleChange = (event: SelectChangeEvent) => {
    setGraduation(event.target.value as Graduations)
  }

  return (
    <Paper className='max-w-80 py-5 px-10'>
      <h1 className='text-2xl font-bold mb-3'>Cargar alumno</h1>
      <form
        className='flex flex-col gap-3'
        onSubmit={(e) => {
          e.preventDefault()
          const target = { ...e.target, graduation }
          addStudent(target).then(() => updateStudents())
        }}
      >
        <TextField id='name' label='Nombre' variant='standard' InputLabelProps={{ shrink: true }} required />
        <TextField id='lastName' label='Apellido' variant='standard' InputLabelProps={{ shrink: true }} required />
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
        <TextField id='phone' type='number' label='Teléfono' variant='standard' InputLabelProps={{ shrink: true }} />
        <TextField
          label='Nacimiento'
          id='birthDate'
          type='date'
          variant='standard'
          InputLabelProps={{ shrink: true }}
        />
        <TextField label='Inicio' id='startDate' type='date' variant='standard' InputLabelProps={{ shrink: true }} />

        <div className='flex flex-col mt-5'>
          <Button type='submit' variant='contained'>
            Agregar
          </Button>
        </div>
      </form>
    </Paper>
  )
}

export default StudentsForm
