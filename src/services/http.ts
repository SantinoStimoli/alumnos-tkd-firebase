import { deleteData, postData, putData } from './credentials'

export async function addStudent(student: StudentsForm) {
  await postData('students', student)
}

export async function deleteStudent(id: string) {
  await deleteData('students', id)
}

export async function deleteStudents(ids: string[]) {
  const deleteStudents = ids.map(async (id) => {
    await deleteData('students', id)
  })

  await Promise.all(deleteStudents)
}

export async function editStudent(studentEdited: StudentsForm, studentId: string) {
  putData('students', studentId, studentEdited)
}
