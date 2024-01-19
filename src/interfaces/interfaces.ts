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
