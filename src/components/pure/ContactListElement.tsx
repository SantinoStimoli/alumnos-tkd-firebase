import { Delete } from '@mui/icons-material'
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React, { ReactElement, useContext, useState } from 'react'
import { deleteContacts } from '../../services/http'
import { LoadingContext } from '../../routes/AppRouting'

const ContactListElement = ({
  label,
  phone,
  action,
  icon,
  id,
  updateContacts,
}: {
  label: string
  phone?: number | string
  action?: () => void
  icon: ReactElement
  id?: string
  updateContacts?: () => Promise<void>
}) => {
  const [hover, setHover] = useState(false)

  const setLoading = useContext(LoadingContext)

  const deleteContact = (contactId: string) => {
    if (setLoading) setLoading(true)
    deleteContacts([contactId]).finally(() => {
      updateContacts !== undefined &&
        updateContacts().then(() => {
          if (setLoading) setLoading(false)
        })
    })
  }

  return (
    <ListItem
      className={'' + (action !== undefined ? 'rounded hover:bg-gray-200 transition-all cursor-pointer' : '')}
      onClick={action}
    >
      <ListItemAvatar onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {id !== undefined && hover ? (
          <Avatar onClick={() => deleteContact(id)} className='cursor-pointer !bg-red-600'>
            <Delete />
          </Avatar>
        ) : (
          <Avatar>{icon}</Avatar>
        )}
      </ListItemAvatar>
      <a href={action === undefined ? `whatsapp://send?phone=${phone}` : '#'} className='[&_p]:hover:underline'>
        <ListItemText primary={label} secondary={phone} />
      </a>
    </ListItem>
  )
}

export default ContactListElement
