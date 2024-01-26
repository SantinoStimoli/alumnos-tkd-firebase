import React, { FormEvent, useContext } from 'react'
import { Button, Paper, TextField } from '@mui/material'
import { LoadingContext } from '../../routes/AppRouting.tsx'
import { addContact, editContact } from '../../services/http.ts'
import { formatContact } from '../../services/services.ts'
import { Contact } from '../../interfaces/interfaces.ts'

const ContactsForm = ({
  studentId,
  contactToEdit,
  updateContacts,
}: {
  studentId?: string
  contactToEdit?: Contact | undefined
  updateContacts: () => Promise<void>
}) => {
  const contactCondition = contactToEdit !== undefined

  const setLoading = useContext(LoadingContext)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading && setLoading(true)
    const target = e.target
    if (contactCondition && studentId === undefined) {
      editContact(formatContact(target), contactToEdit.id).then(() =>
        updateContacts().finally(() => {
          setLoading && setLoading(false)
        }),
      )
    } else {
      addContact(formatContact(target, studentId)).then(() => {
        updateContacts().finally(() => {
          setLoading && setLoading(false)
        })
      })
    }
  }
  return (
    <Paper className='modal-content'>
      <h1>{contactCondition ? 'Editar contacto' : 'Cargar contacto'}</h1>
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
