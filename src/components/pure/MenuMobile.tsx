import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ListElement from './ListElement'
import { Logout } from '@mui/icons-material'

const MenuMobile = ({
  logOut,
  elements,
  selectedItem,
  setSelectedItem,
}: {
  logOut: () => void
  elements: { label: string; icon: ReactElement }[]
  selectedItem: string
  setSelectedItem: Dispatch<SetStateAction<string>>
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <Box id='mobile' sx={{ display: 'flex' }}>
      <AppBar component='nav' color='default'>
        <Toolbar>
          <IconButton className='!mr-3' edge='start' onClick={() => setDrawerOpen(!drawerOpen)}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>TKD</Typography>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(!drawerOpen)}
          ModalProps={{ keepMounted: true }}
          className='[&_.MuiDrawer-paper]:w-[240px]'
        >
          <Box className='text-center' onClick={() => setDrawerOpen(!drawerOpen)}>
            <Typography variant='h6' className='!py-4'>
              TKD
            </Typography>
            <Divider />
            <List>
              {elements.map((e, i) => (
                <ListElement
                  key={i}
                  label={e.label}
                  icon={e.icon}
                  setSelectedItem={setSelectedItem}
                  isSelected={e.label === selectedItem}
                />
              ))}
              <ListElement label='Cerrar sesión' icon={<Logout />} action={logOut} />
            </List>
          </Box>
        </Drawer>
      </nav>
    </Box>
  )
}

export default MenuMobile
