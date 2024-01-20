import React, { useState } from 'react'
import { getData } from '../services/credentials'
import { Modal } from '@mui/material'
import PersonalTable from '../components/pure/table/Table'
import StudentsForm from '../components/Students/StudentsForm'

const Students = () => {
  const [rows, setRows] = useState<Students[]>([])
  const [form, setForm] = useState<Students | boolean>(false)

  const getStudents = () => {
    getData('students').then((r: Object[]) => {
      const studentsData: Students[] = r as Students[]
      setRows(studentsData)
    })
  }

  React.useEffect(() => getStudents(), [])

  return (
    <main className='main-students'>
      <Modal open={form !== false} onClose={() => setForm(false)} className='flex justify-center items-center'>
        <StudentsForm updateStudents={getStudents} studentToEdit={typeof form !== 'boolean' ? form : undefined} />
      </Modal>
      <PersonalTable rows={rows} getElements={getStudents} setForm={setForm} />
    </main>
  )
}

export default Students
