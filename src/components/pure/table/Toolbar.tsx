import React from 'react'
import { useContext } from 'react'
import { LoadingContext } from '../../../routes/AppRouting'
import { deleteStudents } from '../../../services/http'
import { Add, Delete } from '@mui/icons-material'
import { IconButton, Toolbar, Tooltip, Typography, alpha } from '@mui/material'

const PersonalToolbar = ({
  selected,
  setForm,
  updateStudents,
}: {
  selected: string[]
  updateStudents: () => void
  setForm: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const numSelected = selected.length

  const setLoading = useContext(LoadingContext)

  const deleteStudentsSelected = () => {
    if (setLoading) setLoading(true)
    deleteStudents(selected)
      .then(() => {
        updateStudents()
      })
      .finally(() => {
        if (setLoading) setLoading(false)
      })
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
          {numSelected} seleccionado{numSelected > 1 && 's'}
        </Typography>
      ) : (
        <div className='flex items-center gap-3'>
          <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
            Alumnos
          </Typography>
          <IconButton onClick={() => setForm(true)}>
            <Add />
          </IconButton>
        </div>
      )}
      {numSelected > 0 && (
        <Tooltip title='Eliminar'>
          <IconButton onClick={deleteStudentsSelected}>
            <Delete />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

export default PersonalToolbar
