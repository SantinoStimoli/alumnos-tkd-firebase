import React, { FormEvent, useContext } from 'react'
import { Button, Paper, TextField } from '@mui/material'
import { LoadingContext } from '../../routes/AppRouting.tsx'
import { addContact, editContact } from '../../services/http.ts'
import { formatContact } from '../../services/services.ts'

const ContactsForm = ({
  contactToEdit,
  updateContacts,
}: {
  contactToEdit?: any
  updateContacts: () => Promise<void>
}) => {
  const contactCondition = contactToEdit !== undefined

  const setLoading = useContext(LoadingContext)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (setLoading) setLoading(true)
    const target = e.target
    if (contactCondition) {
      editContact(formatContact(target), contactToEdit.id).then(() =>
        updateContacts().finally(() => {
          if (setLoading) setLoading(false)
        }),
      )
    } else {
      addContact(formatContact(target)).then(() =>
        updateContacts().finally(() => {
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
        />

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
