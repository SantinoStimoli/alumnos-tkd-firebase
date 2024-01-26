import { ReactElement } from 'react'

// STUDENTS
export interface StudentForm {
  name: string
  lastName: string
  graduation: string
  phone: number
  birthDate: string
  startDate: string
  annotations: string
}

export interface Student extends StudentForm {
  id: string
}

// CONTACTS
export interface ContactForm {
  studentsIds: string[]
  name: string
  lastName: string
  phone: number
}

export interface Contact extends ContactForm {
  id: string
}

// EXTRA
export type Order = 'asc' | 'desc'

export interface HeadCell {
  id: keyof Student
  label: string
}
export interface OptionCell {
  label: string
  icon: ReactElement
  action: Function
}
