import { deleteData, postData } from './credentials'
import { formatDate, formatName } from './services'

export async function addStudent(target: any) {
  await postData('students', {
    name: formatName(target.name.value),
    lastName: formatName(target.lastName.value),
    graduation: target.graduation,
    phone: target.phone.value ?? null,
    birthDate: formatDate(target.birthDate.value),
    startDate: formatDate(target.startDate.value),
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
