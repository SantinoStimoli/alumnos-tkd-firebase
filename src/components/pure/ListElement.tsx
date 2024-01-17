import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useState } from 'react'

const ListElement = ({
  label,
  children,
  icon,
  action,
}: {
  label: string
  children?: any
  icon?: any
  action?: () => void
}) => {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <ListItemButton
        onClick={() => {
          action !== undefined && action()
          setOpen(!open)
        }}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={label} />
      </ListItemButton>
      <Collapse in={children !== undefined && open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding className='[&>*]:pl-4 bg-black/10'>
          {children}
        </List>
      </Collapse>
    </div>
  )
}

export default ListElement
