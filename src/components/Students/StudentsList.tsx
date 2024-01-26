import { Add, FamilyRestroom } from '@mui/icons-material'
import { Button, FormControl, InputLabel, List, MenuItem, Modal, Paper, Select, SelectChangeEvent } from '@mui/material'
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Student } from '../../interfaces/interfaces'
import { addStudentToContact, getStudents, getStudentsByContactId } from '../../services/services'
import ContactListElement from '../pure/ContactListElement'
import { LoadingContext } from '../../routes/AppRouting'

const StudentsList = ({ contactId }: { contactId: string }) => {
  const [connectedStudents, setConnectedStudents] = useState<Student[]>([])
  const [studentAddForm, setStudentAddForm] = useState(false)
  const [studentId, setStudentId] = useState('')

  const [studentsForm, setStudentsForm] = useState<Student[]>([])

  const setLoading = useContext(LoadingContext)

  const getStudentContact = async () => {
    setLoading && setLoading(true)
    getStudentsByContactId(contactId, setConnectedStudents).finally(() => {
      setLoading && setLoading(false)
    })
  }

  const handleChange = (event: SelectChangeEvent) => {
    setStudentId(event.target.value as string)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading && setLoading(true)
    addStudentToContact(contactId, studentId).finally(() => {
      getStudentContact().finally(() => setLoading && setLoading(false))
    })
  }

  useEffect(() => {
    getStudentContact()
    getStudents().then((r) => setStudentsForm(r))
  }, [])

  return (
    <Paper className='modal-content'>
      {/* M O D A L E S */}
      <Modal open={studentAddForm} onClose={() => setStudentAddForm(false)} className='modal'>
        <Paper className='modal-content'>
          <form onSubmit={handleSubmit}>
            <h1>Añadir alumno como conexión</h1>
            <FormControl fullWidth>
              <InputLabel id='students'>Alumno</InputLabel>
              <Select labelId='students' label='Alumnos' value={studentId} onChange={handleChange} required>
                {studentsForm.map((student, i) => {
                  return (
                    <MenuItem key={i} value={student.id}>
                      {student.name} {student.lastName} ({student.graduation})
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <div className='flex justify-center mt-3'>
              <Button variant='contained' type='submit'>
                Añadir
              </Button>
            </div>
          </form>
        </Paper>
      </Modal>

      {/* P A G I N A */}
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {connectedStudents.map((e, i) => {
          return (
            <ContactListElement
              key={i}
              label={`${e.name} ${e.lastName}`}
              phone={e.phone}
              id={e.id}
              icon={<FamilyRestroom />}
              updateContacts={getStudentContact}
            />
          )
        })}

        <ContactListElement action={() => setStudentAddForm(true)} label='Añadir conexión' icon={<Add />} />
      </List>
    </Paper>
  )
}

export default StudentsList
