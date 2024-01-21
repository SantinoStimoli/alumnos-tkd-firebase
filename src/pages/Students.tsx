import React, { useEffect, useState } from 'react'
import { getData } from '../services/credentials'
import { Modal } from '@mui/material'
import PersonalTable from '../components/pure/table/Table'
import StudentsForm from '../components/Students/StudentsForm'
import { deleteStudents } from '../services/http'
import { ContactEmergency, EditNote } from '@mui/icons-material'
import { HeadCell, Student } from '../interfaces/interfaces'

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
  {
    id: 'birthDate',
    label: 'Nacimiento',
  },
  {
    id: 'startDate',
    label: 'Comienzo',
  },
]

const Students = () => {
  const [rows, setRows] = useState<Student[]>([])
  const [form, setForm] = useState<Object | boolean>(false)

  const getStudents = async () => {
    await getData('students').then((r: Object[]) => {
      const studentsData: Student[] = r as Student[]
      setRows(studentsData)
    })
  }

  useEffect(() => {
    getStudents()
  }, [])

  return (
    <main>
      <Modal open={form !== false} onClose={() => setForm(false)} className='flex justify-center items-center'>
        <div>
          <StudentsForm updateStudents={getStudents} studentToEdit={typeof form !== 'boolean' ? form : undefined} />
        </div>
      </Modal>
      <PersonalTable
        label='Alumno'
        rows={rows}
        getElements={getStudents}
        setForm={setForm}
        deleteElements={deleteStudents}
        headCells={headCells}
        options={[
          { label: 'Editar Alumno', icon: <EditNote />, action: (row: Student) => setForm(row) },
          { label: 'Ver contactos', icon: <ContactEmergency />, action: (row: Student) => console.log(row) },
        ]}
      />
    </main>
  )
}

export default Students
