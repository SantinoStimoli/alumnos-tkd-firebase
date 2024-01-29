import { Dispatch, SetStateAction } from 'react'
import { Contact, ContactForm, Student, StudentForm } from '../interfaces/interfaces'
import { db } from './credentials'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'

// STUDENTS

export async function getStudents() {
  const response = await getDocs(collection(db, 'students'))
  const data: Object[] = []
  response.forEach((d) => data.push({ ...d.data(), id: d.id }))

  return data as Student[]
}

export async function getStudent(id: string) {
  return await getDoc(doc(db, 'students', id))
}

export async function addStudent(student: StudentForm) {
  await addDoc(collection(db, 'students'), student)
}

export async function deleteStudents(ids: string[]) {
  const deleteStudents = ids.map(async (id) => {
    await deleteDoc(doc(db, 'students', id))
  })

  await Promise.all(deleteStudents)
}

export async function editStudent(studentEdited: StudentForm, studentId: string) {
  await setDoc(doc(db, 'students', studentId), studentEdited)
}

export async function upgradeGraduation(studentId: string, newGraduation: string) {
  await updateDoc(doc(db, 'students', studentId), { graduation: newGraduation })
}

export async function addStudentToContact(contactId: string, studentId: string) {
  await getContact(contactId).then((r) => {
    const data = r.data() as Contact
    const ids = data.studentsIds
    if (!ids.includes(studentId)) {
      updateDoc(doc(db, 'contacts', contactId), { studentsIds: [...ids, studentId] })
    }
  })
}

// CONTACTS

export async function getContacts() {
  const response = await getDocs(collection(db, 'contacts'))
  const data: Object[] = []
  response.forEach((d) => data.push({ ...d.data(), id: d.id }))

  return data as Contact[]
}

export async function getContact(id: string) {
  return await getDoc(doc(db, 'contacts', id))
}

export async function getContactsByStudent(studentId: string) {
  const response = await getDocs(
    query(collection(db, 'contacts'), where('studentsIds', 'array-contains', studentId)), //VER ESTOOOOOO
  )
  const data: Object[] = []
  response.forEach((d) => data.push({ ...d.data(), id: d.id }))

  const contactsData: Contact[] = data as Contact[]

  return contactsData
}

export async function addContact(contact: ContactForm) {
  await addDoc(collection(db, 'contacts'), contact)
}

export async function deleteContacts(ids: string[]) {
  const deleteContacts = ids.map(async (id) => {
    await deleteDoc(doc(db, 'contacts', id))
  })

  await Promise.all(deleteContacts)
}

export async function editContact(contactEdited: ContactForm, contactId: string) {
  await setDoc(doc(db, 'contacts', contactId), contactEdited)
}

export async function getStudentsByContactId(contactId: string, setStudents: Dispatch<SetStateAction<Student[]>>) {
  getContact(contactId).then((r) => {
    const contacts = r.data() as Contact

    const studentPromises = contacts.studentsIds.map(async (studentId) => {
      const student = (await getStudent(studentId)).data()
      return { id: studentId, ...student }
    })

    Promise.all(studentPromises).then((responses) => {
      const studentsData = responses.map((r) => r as Student)
      setStudents(studentsData)
    })
  })
}

export async function removeContactFromStudent(contactId: string, studentId: string) {
  getContact(contactId).then((r) => {
    const { studentsIds } = r.data() as Contact
    let indexToDelete = studentsIds.indexOf(studentId)
    studentsIds.splice(indexToDelete, 1)

    updateDoc(doc(db, 'contacts', contactId), { studentsIds })
  })
}

export async function removeStudentFromContact(studentId: string, contactId: string) {
  console.log(`IDCONTACTO: ${contactId} IDSTUDENT: ${studentId}`)
}
