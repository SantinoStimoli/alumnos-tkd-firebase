import { CalendarMonth, Home, Logout, PeopleAlt } from '@mui/icons-material'
import { List, ListSubheader, Paper } from '@mui/material'
import React, { useState } from 'react'
import ListElement from './ListElement'

const Sidebar = ({ logOut }: { logOut: () => void }) => {
  const listedElements = [
    { label: 'Inicio', icon: <Home /> },
    { label: 'Alumnos', icon: <PeopleAlt /> },
    { label: 'Cuotas', icon: <CalendarMonth /> },
  ]
  const [selectedItem, setSelectedItem] = useState('Inicio')

  return (
    <aside>
      <Paper>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component='nav'
          aria-labelledby='MENU'
          subheader={
            <ListSubheader component='div' id='nested-list-subheader'>
              MENU
            </ListSubheader>
          }
        >
          {listedElements.map((e, i) => {
            return (
              <ListElement
                key={i}
                label={e.label}
                icon={e.icon}
                isSelected={e.label === selectedItem}
                setSelectedItem={setSelectedItem}
              />
            )
          })}
          <ListElement label='Cerrar sesión' icon={<Logout />} action={logOut} />
        </List>
      </Paper>
    </aside>
  )
}

export default Sidebar
