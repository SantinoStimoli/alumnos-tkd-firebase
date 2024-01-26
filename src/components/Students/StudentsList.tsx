import { FamilyRestroom } from '@mui/icons-material'
import { List, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Student } from '../../interfaces/interfaces'
import { getStudent } from '../../services/http'
import ContactListElement from '../pure/ContactListElement'

const StudentsList = ({ ids }: { ids: string[] }) => {
  const [students, setStudents] = useState<Student[]>([])

  const getStudentContact = async () => {
    ids.forEach((id) => {
      getStudent(id).then((r) => {
        setStudents(r.data() as Student[])
      })
    })
  }

  useEffect(() => {
    getStudentContact()
  }, [])

  return (
    <Paper className='max-w-80 py-5 px-10'>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {students.map((e, i) => {
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

        {/* <ContactListElement action={() => setStudentForm(true)} label='Añadir contacto' icon={<Add />} /> */}
      </List>
    </Paper>
  )
}

export default StudentsList
