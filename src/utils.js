const snakeToPascal = value => value.replace(/(\_\w)/g, m => m[1].toUpperCase())

const pascalToSnake = value =>
  value
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase()

const convertObject = object => {
  if (object != null && Array.isArray(object)) {
    return object.map(elem => convertObject(elem))
  }

  if (object != null && typeof object === 'object') {
    const result = {}
    for (let [key, value] of Object.entries(object)) {
      if (object.hasOwnProperty(key)) {
        result[snakeToPascal(key)] = convertObject(value)
      }
    }
    return result
  }

  return object
}

const convertISO = iso => {
  if (iso) {
    const date = new Date(iso)
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
  }
  return null
}

export default {
  snakeToPascal,
  pascalToSnake,
  convertObject,
  convertISO,
}
