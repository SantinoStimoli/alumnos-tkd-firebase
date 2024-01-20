// STUDENTS
interface StudentsForm {
  name: string
  lastName: string
  graduation: string
  phone: number
  birthDate: string
  startDate: string
}

interface Students extends StudentsForm {
  id: string
}

// CONTACTS
interface ContactsForm {
  name: string
  lastName: string
  phone: number
}

interface Contacts extends ContactsForm {
  id: string
}

// EXTRA
type Order = 'asc' | 'desc'

interface HeadCell {
  id: keyof Students
  label: string
}
