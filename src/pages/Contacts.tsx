import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import PersonalTable from '../components/pure/table/Table'
import { deleteContacts, getContacts } from '../services/http'
import ContactsForm from '../components/Contacts/ContactsForm'
import { Contact, HeadCell } from '../interfaces/interfaces'
import { EditNote, Person } from '@mui/icons-material'
import StudentsList from '../components/Students/StudentsList'

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
  const [form, setForm] = useState<Contact | boolean>(false)
  const [contactConecctionsIds, setContactConecctionsIds] = useState<string[] | null>(null)
  const [contactId, setContactId] = useState<string>('')

  useEffect(() => {
    getContacts(setRows)
  }, [])

  return (
    <main>
      {/* M O D A L E S */}
      <Modal open={form !== false} onClose={() => setForm(false)} className='modal'>
        <div>
          <ContactsForm
            updateContacts={() => getContacts(setRows)}
            contactToEdit={typeof form !== 'boolean' ? form : undefined}
          />
        </div>
      </Modal>
      <Modal open={contactConecctionsIds !== null} onClose={() => setContactConecctionsIds(null)} className='modal'>
        <div>
          <StudentsList contactId={contactId} />
        </div>
      </Modal>

      {/* P A G I N A */}
      <PersonalTable
        label='Contacto'
        setForm={setForm}
        rows={rows}
        getElements={() => getContacts(setRows)}
        deleteElements={deleteContacts}
        headCells={headCells}
        options={[
          { label: 'Editar Contacto', icon: <EditNote />, action: (row: Contact) => setForm(row) },
          {
            label: 'Conexiones',
            icon: <Person />,
            action: (row: Contact) => {
              setContactId(row.id)
              setContactConecctionsIds(row.studentsIds)
            },
          },
        ]}
      />
    </main>
  )
}

export default Contacts
