import { ContactForm, StudentForm } from '../interfaces/interfaces'
import { deleteData, postData, putData } from './credentials'

// STUDENTS

export async function addStudent(student: StudentForm) {
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

export async function editStudent(studentEdited: StudentForm, studentId: string) {
  putData('students', studentId, studentEdited)
}

// CONTACTS

export async function addContact(contact: ContactForm) {
  await postData('contacts', contact)
}

export async function deleteContact(id: string) {
  await deleteData('contacts', id)
}

export async function deleteContacts(ids: string[]) {
  const deleteContacts = ids.map(async (id) => {
    await deleteData('contacts', id)
  })

  await Promise.all(deleteContacts)
}

export async function editContact(contactEdited: ContactForm, contactId: string) {
  putData('contacts', contactId, contactEdited)
}
