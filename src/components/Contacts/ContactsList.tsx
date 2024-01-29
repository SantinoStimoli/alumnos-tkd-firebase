import { Add, FamilyRestroom } from '@mui/icons-material'
import { List, Modal, Paper } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Contact } from '../../interfaces/interfaces'
import { getContactsByStudent, removeContactFromStudent } from '../../services/services'
import ContactsForm from './ContactsForm'
import ContactListElement from '../pure/ContactListElement'
import { LoadingContext } from '../../routes/AppRouting'

const ContactsList = ({ id }: { id: string }) => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contactForm, setContactForm] = useState(false)

  const getContactsOfTheStudent = async () => {
    await getContactsByStudent(id).then((r) => setContacts(r))
  }

  const setLoading = useContext(LoadingContext)

  const removeContact = (contactId: string) => {
    setLoading && setLoading(true)
    removeContactFromStudent(contactId, id).finally(() => {
      getContactsOfTheStudent().then(() => {
        setLoading && setLoading(false)
      })
    })
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
              label={`${e.name} ${e.lastName}`}
              phone={e.phone}
              id={e.id}
              removeElement={removeContact}
            />
          )
        })}

        <ContactListElement action={() => setContactForm(true)} label='Añadir contacto' />
      </List>
    </Paper>
  )
}

export default ContactsList
