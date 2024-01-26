import React, { useContext, useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import PersonalTable from '../components/pure/table/Table'
import StudentsForm from '../components/Students/StudentsForm'
import { deleteStudents, getStudents } from '../services/http'
import { ContactEmergency, Info as InfoIcon } from '@mui/icons-material'
import { HeadCell, Student } from '../interfaces/interfaces'
import ContactsList from '../components/Contacts/ContactsList'
import { LoadingContext } from '../routes/AppRouting'

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

  const setLoading = useContext(LoadingContext)

  const updateStudents = async () => {
    setLoading && setLoading(true)
    await getStudents()
      .then((r) => setRows(r))
      .finally(() => setLoading && setLoading(false))
  }

  useEffect(() => {
    updateStudents()
  }, [])

  return (
    <main>
      {/* M O D A L E S */}
      <Modal open={editForm !== false} onClose={() => setEditForm(false)} className='modal'>
        <div>
          <StudentsForm
            updateStudents={() => updateStudents()}
            studentToEdit={typeof editForm !== 'boolean' ? editForm : undefined}
          />
        </div>
      </Modal>
      <Modal open={studentId !== ''} onClose={() => setStudentId('')} className='modal'>
        <div>
          <ContactsList id={studentId} />
        </div>
      </Modal>

      {/* P A G I N A */}
      <PersonalTable
        label='Alumno'
        rows={rows}
        getElements={updateStudents}
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
