import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const MenuMobile = ({ logOut, elements }: { logOut: () => void; elements: { label: string; icon: any }[] }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <Box id='mobile' sx={{ display: 'flex' }}>
      <AppBar component='nav' color='default'>
        <Toolbar>
          <IconButton className='!mr-3' edge='start' onClick={() => setMobileOpen(!mobileOpen)}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>TKD</Typography>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(!mobileOpen)}
          ModalProps={{ keepMounted: true }}
          className='[&_.MuiDrawer-paper]:w-[240px]'
        >
          <Box className='[&_*]:text-center' onClick={() => setMobileOpen(!mobileOpen)}>
            <Typography variant='h6' className='!py-4'>
              TKD
            </Typography>
            <Divider />
            <List>
              {elements.map((e, i) => (
                <ListItem key={i}>
                  <ListItemButton>
                    <ListItemText primary={e.label} />
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem disablePadding>
                <ListItemButton onClick={logOut}>
                  <ListItemText primary={'Cerrar sesión'} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </nav>
    </Box>
  )
}

export default MenuMobile
