import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { visuallyHidden } from '@mui/utils'
import { Add, Delete, EditNote } from '@mui/icons-material'
import { IconButton, Toolbar, Tooltip, Typography, alpha } from '@mui/material'
import { deleteStudents } from '../../services/http'
import { LoadingContext } from '../../routes/AppRouting'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

interface HeadCell {
  id: keyof Students
  label: string
}

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Students) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Students) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Opciones</TableCell>
      </TableRow>
    </TableHead>
  )
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    label: 'Nombre',
  },
  {
    id: 'lastName',
    label: 'Apellido',
  },
  {
    id: 'graduation',
    label: 'Graduación',
  },
  {
    id: 'phone',
    label: 'Teléfono',
  },
  {
    id: 'birthDate',
    label: 'Nacimiento',
  },
  {
    id: 'startDate',
    label: 'Comienzo',
  },
]

function EnhancedTableToolbar(props: {
  selected: string[]
  updateStudents: () => void
  setForm: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { selected, updateStudents, setForm } = props
  const numSelected = selected.length

  const setLoading = React.useContext(LoadingContext)

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

const StudentsTable = ({
  rows,
  getStudents,
  setForm,
}: {
  rows: Students[]
  getStudents: () => void
  setForm: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Students>('name')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Students) => {
    event.preventDefault()
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    event
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (id: string) => selected.indexOf(id) !== -1

  const visibleRows = React.useMemo(
    () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows],
  )

  // const deleteRow = (id: string) => {
  //   deleteStudent(id).then(() => updateStudents())
  // }

  function updateStudents() {
    getStudents()
    setSelected([])
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar selected={selected} updateStudents={updateStudents} setForm={setForm} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(row.id)}
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        color='primary'
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>

                    <TableCell component='th' id={labelId} scope='row' padding='none'>
                      {row.name}
                    </TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.graduation}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.birthDate}</TableCell>
                    <TableCell>{row.startDate}</TableCell>
                    <TableCell>
                      <Tooltip title='Eliminar alumno' placement='left'>
                        <EditNote className='text-gray-400 hover:text-gray-500 [&_*]:transition-colors' />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage='Filas por página'
        />
      </Paper>
    </Box>
  )
}

export default StudentsTable
