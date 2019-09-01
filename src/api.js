import axios from 'axios'

const attachInterceptors = () => {
  axios.interceptors.response.use(
    function(response) {
      return response.data.statusCode === 500
        ? Promise.reject(response)
        : response
    },
    function(error) {
      return Promise.reject(error)
    },
  )
}

const snakeToPascal = value => value.replace(/(\_\w)/g, m => m[1].toUpperCase())

const convertObject = object => {
  const result = {}

  for (let [key, value] of Object.entries(object)) {
    if (object.hasOwnProperty(key)) {
      result[snakeToPascal(key)] = value
    }
  }

  return result
}

const getEquipment = (success, failure) => {
  get(`${process.env.LAMBDA_ENDPOINT}getEquipment`, success, failure)
}

const getOems = (success, failure) => {
  get(`${process.env.LAMBDA_ENDPOINT}getOems`, success, failure)
}

const getModels = (success, failure) => {
  get(`${process.env.LAMBDA_ENDPOINT}getModels`, success, failure)
}

const getTypes = (success, failure) => {
  get(`${process.env.LAMBDA_ENDPOINT}getTypes`, success, failure)
}

const get = (url, success, failure) => {
  attachInterceptors()
  axios
    .get(url)
    .then(result => {
      const converted = result.data.body.map(elem => convertObject(elem))
      success(converted)
    })
    .catch(error => {
      failure(error.data.body)
    })
}

export default { getEquipment, getOems, getModels, getTypes }
