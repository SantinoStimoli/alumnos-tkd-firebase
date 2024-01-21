import { ContactForm, StudentForm } from '../interfaces/interfaces'
import { getStudent, upgradeGraduation } from './http'

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
  return {
    name: formatName(contactToFormat[0].value),
    lastName: formatName(contactToFormat[1].value),
    phone: contactToFormat[2].value ?? '-',
    studentId: studentId ?? '',
  }
}

export async function upgradeGraduations(ids: string[]) {
  const logic: { [key: string]: string } = {
    'Blanco': 'Punta amarilla',
    'Punta amarilla': 'Amarillo',
    'Amarillo': 'Punta verde',
    'Punta verde': 'Verde',
    'Verde': 'Punta azul',
    'Punta azul': 'Azul',
    'Azul': 'Punta roja',
    'Punta roja': 'Rojo',
    'Rojo': 'Punta negra',
    'Punta negra': 'Negro (I)',
    'Negro (I)': 'Negro (II)',
    'Negro (II)': 'Negro (III)',
    'Negro (III)': 'Negro (IV)',
    'Negro (IV)': 'Negro (V)',
    'Negro (V)': 'Negro (VI)',
    'Negro (VI)': 'Negro (VII)',
    'Negro (VII)': 'Negro (VIII)',
    'Negro (VIII)': 'Negro (IX)',
  }

  await ids.forEach((id) => {
    getStudent(id).then((r) => {
      upgradeGraduation(r.id, logic[r.data()?.graduation] ?? 'Negro (IX)')
    })
  })
}
