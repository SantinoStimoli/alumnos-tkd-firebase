import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatUrl } from '../../services/services'

const ListElement = ({
  label,
  icon,
  action,
  isSelected,
  setSelectedItem,
}: {
  label: string
  icon?: ReactElement
  action?: () => void
  isSelected?: boolean
  setSelectedItem?: Dispatch<SetStateAction<string>>
}) => {
  const [open, setOpen] = useState(true)

  return (
    <ListItemButton
      component={Link}
      to={'/alumnos-tkd/' + formatUrl(label)}
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
  )
}

export default ListElement
