import { Add, FamilyRestroom } from '@mui/icons-material'
import { List, Modal, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Contact } from '../../interfaces/interfaces'
import { getContactsByStudent } from '../../services/services'
import ContactsForm from './ContactsForm'
import ContactListElement from '../pure/ContactListElement'

const ContactsList = ({ id }: { id: string }) => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contactForm, setContactForm] = useState(false)

  const getContactsOfTheStudent = async () => {
    await getContactsByStudent(id).then((r) => setContacts(r))
  }

  useEffect(() => {
    getContactsOfTheStudent()
  }, [])

  return (
    <Paper className='modal-content'>
      <Modal open={contactForm} onClose={() => setContactForm(false)} className='modal'>
        <div>
          <ContactsForm studentId={id} updateContacts={getContactsOfTheStudent} />
        </div>
      </Modal>

      <List>
        {contacts.map((e, i) => {
          return (
            <ContactListElement
              key={i}
              studentId={id}
              label={`${e.name} ${e.lastName}`}
              phone={e.phone}
              id={e.id}
              icon={<FamilyRestroom />}
              updateContacts={getContactsOfTheStudent}
            />
          )
        })}

        <ContactListElement action={() => setContactForm(true)} label='Añadir contacto' icon={<Add />} />
      </List>
    </Paper>
  )
}

export default ContactsList
