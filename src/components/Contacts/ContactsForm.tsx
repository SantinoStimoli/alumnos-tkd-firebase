import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField } from '@mui/material'
import { LoadingContext } from '../../routes/AppRouting.tsx'
import { addContact, addStudentToContact, editContact, getContacts } from '../../services/services.ts'
import { formatContact } from '../../utils/utils.ts'
import { Contact } from '../../interfaces/interfaces.ts'

const ContactsForm = ({
  studentId,
  contactToEdit,
  updateContacts,
  addToStudentsForm = false,
}: {
  studentId?: string
  contactToEdit?: Contact | undefined
  updateContacts: () => Promise<void>
  addToStudentsForm?: boolean
}) => {
  const isViewMode = contactToEdit !== undefined

  const [contactSelect, setContactSelect] = useState<Contact[]>([])
  const [contactId, setContactId] = useState('')
  const [createdContactMode, setCreatedContactMode] = useState(true)
  const [isEditMode, setIsEditMode] = useState(false)

  const handleChange = (event: SelectChangeEvent) => {
    setContactId(event.target.value as string)
  }

  const setLoading = useContext(LoadingContext)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading && setLoading(true)
    if (addToStudentsForm && createdContactMode) {
      addStudentToContact(contactId, studentId ?? '').then(() => {
        updateContacts().finally(() => {
          setLoading && setLoading(false)
        })
      })
    } else {
      if (isViewMode && studentId === undefined) {
        editContact(formatContact(e.target), contactToEdit.id).then(() =>
          updateContacts().finally(() => {
            setIsEditMode(false)
            setLoading && setLoading(false)
          }),
        )
      } else {
        addContact(formatContact(e.target, studentId)).then(() => {
          updateContacts().finally(() => {
            setLoading && setLoading(false)
          })
        })
      }
    }
  }

  useEffect(() => {
    getContacts().then((r) => setContactSelect(r))
  }, [])

  return (
    <Paper className='modal-content'>
      <h1>{isViewMode ? 'Editar contacto' : 'Cargar contacto'}</h1>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        {addToStudentsForm && createdContactMode ? (
          <FormControl fullWidth>
            <InputLabel id='contacts'>Contacto</InputLabel>
            <Select labelId='contacts' label='Contacto' value={contactId} onChange={handleChange} required>
              {contactSelect.map((contact, i) => {
                return (
                  <MenuItem key={i} value={contact.id}>
                    {contact.name} {contact.lastName} ({contact.phone})
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        ) : (
          <div className='flex flex-col gap-3'>
            <TextField
              disabled={isViewMode && !isEditMode}
              fullWidth
              defaultValue={isViewMode ? contactToEdit.name : ''}
              id='name'
              label='Nombre'
              variant='standard'
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              disabled={isViewMode && !isEditMode}
              fullWidth
              defaultValue={isViewMode ? contactToEdit.lastName : ''}
              id='lastName'
              label='Apellido'
              variant='standard'
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              disabled={isViewMode && !isEditMode}
              fullWidth
              defaultValue={isViewMode ? contactToEdit.phone : ''}
              id='phone'
              type='number'
              label='Teléfono'
              variant='standard'
              InputLabelProps={{ shrink: true }}
              required
            />
          </div>
        )}

        <div className={'flex' + (isViewMode ? ' [&>*]:w-1/2 gap-3' : ' flex-col-reverse')}>
          {isViewMode ? (
            <Button onClick={() => setIsEditMode(!isEditMode)} type='button' variant='contained'>
              Editar
            </Button>
          ) : (
            addToStudentsForm && (
              <Button type='button' onClick={() => setCreatedContactMode(!createdContactMode)}>
                {createdContactMode ? 'Crear contacto' : 'Contacto existente'}
              </Button>
            )
          )}
          <Button type='submit' variant='contained'>
            {isViewMode ? 'Confirmar' : 'Añadir'}
          </Button>
        </div>
      </form>
    </Paper>
  )
}

export default ContactsForm
