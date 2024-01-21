import React, { useEffect, useState } from 'react'
import { getData } from '../services/credentials'
import { Modal } from '@mui/material'
import PersonalTable from '../components/pure/table/Table'
import { deleteContacts } from '../services/http'
import ContactsForm from '../components/Contacts/ContactsForm'
import { Contact, HeadCell } from '../interfaces/interfaces'
import { EditNote } from '@mui/icons-material'

const headCells: HeadCell[] = [
  {
    id: 'name',
    label: 'Nombre',
  },
  {
    id: 'lastName',
    label: 'Apellido',
  },
  {
    id: 'phone',
    label: 'Teléfono',
  },
]

const Contacts = () => {
  const [rows, setRows] = useState<Contact[]>([])
  const [form, setForm] = useState<Object | boolean>(false)

  const getContacts = async () => {
    await getData('contacts').then((r: Object[]) => {
      const contactsData: Contact[] = r as Contact[]
      setRows(contactsData)
    })
  }

  useEffect(() => {
    getContacts()
  }, [])

  return (
    <main>
      <Modal open={form !== false} onClose={() => setForm(false)} className='flex justify-center items-center'>
        <div>
          <ContactsForm updateContacts={getContacts} contactToEdit={typeof form !== 'boolean' ? form : undefined} />
        </div>
      </Modal>
      <PersonalTable
        label='Contacto'
        rows={rows}
        getElements={getContacts}
        setForm={setForm}
        deleteElements={deleteContacts}
        headCells={headCells}
        options={[{ label: 'Editar Contacto', icon: <EditNote />, action: (row: Contact) => setForm(row) }]}
      />
    </main>
  )
}

export default Contacts
