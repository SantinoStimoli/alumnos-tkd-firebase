import { ContactForm, StudentForm } from '../interfaces/interfaces'

export function formatDate(date: string, isToWeb?: boolean) {
  if (date === '' || date === undefined) return '-'
  if (isToWeb === true) {
    const [day, month, year] = date.split('/')
    return `${year}-${month}-${day}`
  } else {
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  }
}

export function formatName(name: string): string {
  return name
    .split(' ')
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
    .join(' ')
}

export function formatUrl(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-')
}

export function formatStudent(studentToFormat: any): StudentForm {
  return {
    name: formatName(studentToFormat[0].value),
    lastName: formatName(studentToFormat[1].value),
    graduation: studentToFormat[2].value,
    phone: studentToFormat[4].value === '' ? '-' : studentToFormat[4].value,
    birthDate: formatDate(studentToFormat[5].value),
    startDate: formatDate(studentToFormat[6].value),
  }
}

export function formatContact(contactToFormat: any, studentId: string): ContactForm {
  console.log({
    name: formatName(contactToFormat[0].value),
    lastName: formatName(contactToFormat[1].value),
    phone: contactToFormat[2].value ?? '-',
    studentId,
  })
  return {
    name: formatName(contactToFormat[0].value),
    lastName: formatName(contactToFormat[1].value),
    phone: contactToFormat[2].value ?? '-',
    studentId: studentId ?? '',
  }
}
