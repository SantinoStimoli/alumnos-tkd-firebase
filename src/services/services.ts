export function formatDate(date: any) {
  if (date === '' || date === undefined) return '-'

  const [year, month, day] = date.split('-')

  return `${day}/${month}/${year}`
}

export function formatName(name: string): string {
  return name
    .split(' ')
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
    .join(' ')
}
