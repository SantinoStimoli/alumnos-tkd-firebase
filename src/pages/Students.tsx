import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import PersonalTable from '../components/pure/table/Table'
import StudentsForm from '../components/Students/StudentsForm'
import { deleteStudents, getStudents } from '../services/http'
import { ContactEmergency, Info as InfoIcon } from '@mui/icons-material'
import { HeadCell, Student } from '../interfaces/interfaces'
import ContactsList from '../components/Contacts/ContactsList'

const headCells: HeadCell[] = [
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
]

const Students = () => {
  const [rows, setRows] = useState<Student[]>([])
  const [editForm, setEditForm] = useState<Object | boolean>(false)
  const [studentId, setStudentId] = useState<string>('')

  useEffect(() => {
    getStudents(setRows)
  }, [])

  return (
    <main>
      {/* M O D A L E S */}
      <Modal open={editForm !== false} onClose={() => setEditForm(false)} className='flex justify-center items-center'>
        <div>
          <StudentsForm
            updateStudents={() => getStudents(setRows)}
            studentToEdit={typeof editForm !== 'boolean' ? editForm : undefined}
          />
        </div>
      </Modal>
      <Modal open={studentId !== ''} onClose={() => setStudentId('')} className='flex justify-center items-center'>
        <div>
          <ContactsList id={studentId} />
        </div>
      </Modal>

      {/* P A G I N A */}
      <PersonalTable
        label='Alumno'
        rows={rows}
        getElements={() => getStudents(setRows)}
        setForm={setEditForm}
        deleteElements={deleteStudents}
        headCells={headCells}
        options={[
          { label: 'Ver Alumno', icon: <InfoIcon />, action: (row: Student) => setEditForm(row) },
          { label: 'Ver contactos', icon: <ContactEmergency />, action: (row: Student) => setStudentId(row.id) },
        ]}
      />
    </main>
  )
}

export default Students
