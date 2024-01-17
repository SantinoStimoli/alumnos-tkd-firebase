import { CalendarMonth, Home, Logout, PeopleAlt } from '@mui/icons-material'
import { List, ListSubheader, Paper } from '@mui/material'
import React from 'react'
import ListElement from './ListElement'

const Sidebar = ({ logOut }: { logOut: () => void }) => {
  return (
    <aside>
      <Paper>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component='nav'
          aria-labelledby='nested-list-subheader'
          subheader={
            <ListSubheader component='div' id='nested-list-subheader'>
              Nested List Items
            </ListSubheader>
          }
        >
          <ListElement label='Inicio' icon={<Home />} />
          <ListElement label='Alumnos' icon={<PeopleAlt />} />
          <ListElement label='Cuotas' icon={<CalendarMonth />} />
          <ListElement label='Cerrar sesión' icon={<Logout />} action={logOut} />
        </List>
      </Paper>
    </aside>
  )
}

export default Sidebar
