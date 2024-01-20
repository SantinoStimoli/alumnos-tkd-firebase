import React, { Dispatch, SetStateAction } from 'react'
import { useContext } from 'react'
import { LoadingContext } from '../../../routes/AppRouting'
import { Add, Delete } from '@mui/icons-material'
import { IconButton, Toolbar, Tooltip, Typography, alpha } from '@mui/material'

const PersonalToolbar = ({
  label,
  selected,
  setForm,
  updateElements,
  deleteElements,
}: {
  label: string
  selected: string[]
  updateElements: () => Promise<void>
  setForm: Dispatch<SetStateAction<boolean>>
  deleteElements: (selected: string[]) => Promise<void>
}) => {
  const numSelected = selected.length

  const setLoading = useContext(LoadingContext)

  const deleteElementsSelected = () => {
    if (setLoading) setLoading(true)
    deleteElements(selected).then(() => {
      updateElements().finally(() => {
        if (setLoading) setLoading(false)
      })
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
            {`${label}s`}
          </Typography>
          <IconButton onClick={() => setForm(true)}>
            <Tooltip title={`Añadir ${label}`}>
              <Add />
            </Tooltip>
          </IconButton>
        </div>
      )}
      {numSelected > 0 && (
        <Tooltip title={`Eliminar ${label}${selected.length > 1 ? 's' : ''}`}>
          <IconButton onClick={deleteElementsSelected}>
            <Delete />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

export default PersonalToolbar
