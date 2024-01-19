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
export function formatStudent(studentToFormat: any): StudentsForm {
  return {
    name: studentToFormat[0].value,
    lastName: studentToFormat[0].value,
    graduation: studentToFormat[0].value,
    phone: studentToFormat[0].value,
    birthDate: studentToFormat[0].value,
    startDate: studentToFormat[0].value,
  }
}
