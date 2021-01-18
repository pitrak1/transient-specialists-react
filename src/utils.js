const snakeToPascal = value => {
  if (value && typeof value === 'string') {
    return value.replace(/(\_\w)/g, m => m[1].toUpperCase())
  }
  return null
}

const pascalToSnake = value => {
  if (value && typeof value === 'string') {
    return value
      .split(/(?=[A-Z])/)
      .join('_')
      .toLowerCase()
  }
  return null
}

const snakeToPascalObject = object => {
  if (object != null && Array.isArray(object)) {
    return object.map(elem => snakeToPascalObject(elem))
  }

  if (object != null && typeof object === 'object') {
    const result = {}
    for (let [key, value] of Object.entries(object)) {
      if (object.hasOwnProperty(key)) {
        result[snakeToPascal(key)] = snakeToPascalObject(value)
      }
    }
    return result
  }

  return object
}

const displayDateFromISO = iso => {
  if (iso && typeof iso === 'string') {
    const date = new Date(iso)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }
  return null
}

const downloadBlob = (blob, filename) => {
  const elem = window.document.createElement('a')
  elem.href = window.URL.createObjectURL(blob)
  elem.download = filename
  document.body.appendChild(elem)
  elem.click()
  document.body.removeChild(elem)
}

export default {
  snakeToPascal,
  pascalToSnake,
  snakeToPascalObject,
  displayDateFromISO,
  downloadBlob
}
