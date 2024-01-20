import React, { useEffect, useState } from 'react'
import { getData } from '../services/credentials'
import { Modal } from '@mui/material'
import PersonalTable from '../components/pure/table/Table'
import { deleteContacts } from '../services/http'
import ContactsForm from '../components/Contacts/ContactsForm'

const Contacts = () => {
  const [rows, setRows] = useState<Contacts[]>([])
  const [form, setForm] = useState<Object | boolean>(false)

  const getContacts = async () => {
    await getData('contacts').then((r: Object[]) => {
      const contactsData: Contacts[] = r as Contacts[]
      setRows(contactsData)
    })
  }

  useEffect(() => {
    getContacts()
  }, [])

  return (
    <main>
      <Modal open={form !== false} onClose={() => setForm(false)} className='flex justify-center items-center'>
        <ContactsForm updateContacts={getContacts} contactToEdit={typeof form !== 'boolean' ? form : undefined} />
      </Modal>
      <PersonalTable
        label='Contacto'
        rows={rows}
        getElements={getContacts}
        setForm={setForm}
        deleteElements={deleteContacts}
      />
    </main>
  )
}

export default Contacts
