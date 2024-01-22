import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField } from '@mui/material'
import { LoadingContext } from '../../routes/AppRouting.tsx'
import { addContact, editContact, getStudents } from '../../services/http.ts'
import { formatContact } from '../../services/services.ts'
import { Contact, Student } from '../../interfaces/interfaces.ts'

const ContactsForm = ({
  contactToEdit,
  updateContacts,
  studentId,
}: {
  contactToEdit?: Contact | undefined
  updateContacts: () => Promise<void>
  studentId?: string
}) => {
  const contactCondition = contactToEdit !== undefined
  const [studentIdToMatch, setStudentIdToMatch] = useState(contactToEdit ? contactToEdit.studentId : '')
  const [students, setStudents] = useState<Student[]>([])

  const handleChange = (event: SelectChangeEvent) => {
    setStudentIdToMatch(event.target.value)
  }

  useEffect(() => {
    getStudents(setStudents)
  }, [])

  const setLoading = useContext(LoadingContext)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (setLoading) setLoading(true)
    const target = e.target
    if (contactCondition) {
      editContact(formatContact(target, studentId ?? studentIdToMatch ?? ''), contactToEdit.id).then(() =>
        updateContacts().finally(() => {
          if (setLoading) setLoading(false)
        }),
      )
    } else {
      addContact(formatContact(target, studentId ?? studentIdToMatch ?? '')).then(() =>
        updateContacts().finally(() => {
          if (setLoading) setLoading(false)
        }),
      )
    }
  }
  return (
    <Paper className='max-w-80 py-5 px-10'>
      <h1 className='text-2xl font-bold mb-3'>Cargar contacto</h1>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <TextField
          defaultValue={contactCondition ? contactToEdit.name : ''}
          id='name'
          label='Nombre'
          variant='standard'
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          defaultValue={contactCondition ? contactToEdit.lastName : ''}
          id='lastName'
          label='Apellido'
          variant='standard'
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          defaultValue={contactCondition ? contactToEdit.phone : ''}
          id='phone'
          type='number'
          label='Teléfono'
          variant='standard'
          InputLabelProps={{ shrink: true }}
          required
        />

        {studentId === undefined && (
          <FormControl fullWidth>
            <InputLabel id='selectStudent'>Alumno</InputLabel>
            <Select labelId='selectStudent' value={studentIdToMatch} onChange={handleChange} label='Alumno' required>
              {students.map((student, i) => {
                return (
                  <MenuItem key={i} value={student.id}>
                    {student.name} {student.lastName} ({student.graduation})
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        )}

        <div className='flex flex-col mt-5'>
          <Button type='submit' variant='contained'>
            {contactCondition ? 'Confirmar' : 'Añadir'}
          </Button>
        </div>
      </form>
    </Paper>
  )
}

export default ContactsForm
