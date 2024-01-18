import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { Dispatch, SetStateAction, useState } from 'react'

const ListElement = ({
  label,
  children,
  icon,
  action,
  isSelected,
  setSelectedItem,
}: {
  label: string
  children?: any
  icon?: any
  action?: () => void
  isSelected?: boolean
  setSelectedItem?: Dispatch<SetStateAction<string>>
}) => {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <ListItemButton
        // to={'/alumnos-tkd/' + formatUrl(label)}
        selected={isSelected}
        onClick={() => {
          action !== undefined && action()
          if (setSelectedItem) setSelectedItem(label)
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
