import React, { useEffect, useState } from 'react'
import { getData } from '../services/credentials'
import { Modal } from '@mui/material'
import PersonalTable from '../components/pure/table/Table'
import StudentsForm from '../components/Students/StudentsForm'
import { deleteStudents } from '../services/http'

const Students = () => {
  const [rows, setRows] = useState<Students[]>([])
  const [form, setForm] = useState<Object | boolean>(false)

  const getStudents = () => {
    getData('students').then((r: Object[]) => {
      const studentsData: Students[] = r as Students[]
      setRows(studentsData)
    })
  }

  useEffect(() => getStudents(), [])

  return (
    <main className='main-students'>
      <Modal open={form !== false} onClose={() => setForm(false)} className='flex justify-center items-center'>
        <StudentsForm updateStudents={getStudents} studentToEdit={typeof form !== 'boolean' ? form : undefined} />
      </Modal>
      <PersonalTable
        label='Alumno'
        rows={rows}
        getElements={getStudents}
        setForm={setForm}
        deleteElements={deleteStudents}
      />
    </main>
  )
}

export default Students
