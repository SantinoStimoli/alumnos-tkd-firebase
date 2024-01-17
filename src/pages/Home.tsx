import React, { useState } from 'react'
import StudentsTable from '../components/Home/StudentsTable'
import { getData } from '../services/credentials'
import StudentsForm from '../components/Home/StudentsForm'
import { Modal } from '@mui/material'

const Home = () => {
  const [rows, setRows] = useState<Students[]>([])
  const [form, setForm] = useState(false)

  const getStudents = () => {
    getData('students').then((r: any) => setRows(r))
  }

  React.useEffect(() => getStudents(), [])

  return (
    <main className='main-students'>
      <Modal open={form} onClose={() => setForm(false)} className='flex justify-center items-center'>
        <StudentsForm updateStudents={getStudents} />
      </Modal>
      <StudentsTable rows={rows} getStudents={getStudents} setForm={setForm} />
    </main>
  )
}

export default Home
