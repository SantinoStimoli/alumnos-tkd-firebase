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

export async function getStudents(setRows: Dispatch<SetStateAction<Student[]>>) {
  const response = await getDocs(collection(db, 'students'))
  const data: Object[] = []
  response.forEach((d) => data.push({ ...d.data(), id: d.id }))

  const studentsData: Student[] = data as Student[]
  setRows(studentsData)
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

// CONTACTS

export async function getContacts(setRows: Dispatch<SetStateAction<Contact[]>>) {
  const response = await getDocs(collection(db, 'contacts'))
  const data: Object[] = []
  response.forEach((d) => data.push({ ...d.data(), id: d.id }))

  const contactsData: Contact[] = data as Contact[]
  setRows(contactsData)
}

export async function getContactsByStudent(studentId: string) {
  const response = await getDocs(query(collection(db, 'contacts'), where('studentId', '==', studentId)))
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
