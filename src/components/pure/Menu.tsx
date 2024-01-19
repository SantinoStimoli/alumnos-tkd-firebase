import { Logout } from '@mui/icons-material'
import { List, ListSubheader, Paper } from '@mui/material'
import React, { ReactElement, useState } from 'react'
import ListElement from './ListElement'

const Menu = ({ logOut, elements }: { logOut: () => void; elements: { label: string; icon: ReactElement }[] }) => {
  const [selectedItem, setSelectedItem] = useState('Inicio')

  return (
    <aside id='desk'>
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
          {elements.map((e, i) => {
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

export default Menu
