import { Add, Delete, FamilyRestroom } from '@mui/icons-material'
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React, { useState } from 'react'

const ContactListElement = ({
  label,
  phone,
  action,
  id,
  removeElement,
}: {
  label: string
  phone?: number | string
  action?: () => void
  id: string
  removeElement?: (id: string) => void
}) => {
  const [hover, setHover] = useState(false)

  return (
    <ListItem
      className={action !== undefined ? 'rounded hover:bg-gray-200 transition-all cursor-pointer' : ''}
      onClick={action}
    >
      <ListItemAvatar onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {action === undefined ? (
          hover ? (
            <Avatar
              onClick={() => removeElement !== undefined && removeElement(id)}
              className='cursor-pointer !bg-red-600'
            >
              <Delete />
            </Avatar>
          ) : (
            <Avatar>
              <FamilyRestroom />
            </Avatar>
          )
        ) : (
          <Avatar>
            <Add />
          </Avatar>
        )}
      </ListItemAvatar>
      <a href={action === undefined ? `whatsapp://send?phone=${phone}` : '#'} className='[&_p]:hover:underline'>
        <ListItemText primary={label} secondary={phone} />
      </a>
    </ListItem>
  )
}

export default ContactListElement
