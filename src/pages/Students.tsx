import React, { useState } from 'react'
import StudentsTable from '../components/Students/StudentsTable'
import { getData } from '../services/credentials'
import StudentsForm from '../components/Students/StudentsForm'
import { Modal } from '@mui/material'

const Students = () => {
  const [rows, setRows] = useState<Students[]>([])
  const [form, setForm] = useState<Students | boolean>(false)

  const getStudents = () => {
    getData('students').then((r: any) => setRows(r))
  }

  React.useEffect(() => getStudents(), [])

  return (
    <main className='main-students'>
      <Modal open={form !== false} onClose={() => setForm(false)} className='flex justify-center items-center'>
        <StudentsForm updateStudents={getStudents} studentToEdit={typeof form !== 'boolean' ? form : undefined} />
      </Modal>
      <StudentsTable rows={rows} getStudents={getStudents} setForm={setForm} />
    </main>
  )
}

export default Students
