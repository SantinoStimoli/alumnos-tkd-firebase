import { FamilyRestroom } from '@mui/icons-material'
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React, { ReactElement } from 'react'

const ContactListElement = ({
  label,
  phone,
  action,
  icon,
}: {
  label: string
  phone?: number | string
  action?: () => void
  icon: ReactElement
}) => {
  return (
    <ListItem
      className={'rounded hover:bg-gray-200 transition-all cursor-pointer' + (action === undefined && ' border-b')}
      component='a'
      href={action === undefined ? `tel:${phone}` : '#'}
      onClick={action}
    >
      <ListItemAvatar>
        <Avatar>{icon}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={label} secondary={phone} />
    </ListItem>
  )
}

export default ContactListElement
