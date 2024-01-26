import { Paper } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Student } from '../../interfaces/interfaces'
import { getStudent } from '../../services/http'
import { LoadingContext } from '../../routes/AppRouting'

const Info = ({ id }: { id: string }) => {
  const [student, setStudent] = useState<Student | undefined>()
  const setLoading = useContext(LoadingContext)

  useEffect(() => {
    if (setLoading) setLoading(true)
    getStudent(id).then((r) => {
      setStudent(r.data() as Student)
      if (setLoading) setLoading(false)
    })
  }, [])

  return (
    <Paper className='max-w-80 py-5 px-10'>
      <h1>{student?.name}</h1>
    </Paper>
  )
}

export default Info
