const snakeToPascal = value => value.replace(/(\_\w)/g, m => m[1].toUpperCase())

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

export default {
  snakeToPascal,
  convertObject,
}
