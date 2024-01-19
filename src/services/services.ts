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
