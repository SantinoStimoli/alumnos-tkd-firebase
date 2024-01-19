import { deleteData, postData } from './credentials'
import { formatDate, formatName } from './services'

export async function addStudent(target: any) {
  await postData('students', {
    name: formatName(target[0].value),
    lastName: formatName(target[1].value),
    graduation: target[2].value,
    phone: target[4].value ?? '-',
    birthDate: formatDate(target[5].value),
    startDate: formatDate(target[6].value),
  })
}

export async function deleteStudent(id: string) {
  await deleteData('students', id)
}

export async function deleteStudents(ids: string[]) {
  const deletePromises = ids.map(async (id) => {
    await deleteData('students', id)
  })

  await Promise.all(deletePromises)
}

export async function editStudent(studentEdited: Students, studentId: string) {
  console.log(studentEdited, studentId)
}
