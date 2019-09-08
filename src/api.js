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

const translateError = error => {
  if (error.includes('duplicate key value violates unique constraint')) {
    if (error.includes('idx_type_name')) {
      return 'Name must be unique (case insensitive)'
    }

    if (error.includes('idx_oem_name')) {
      return 'Name must be unique (case insensitive)'
    }

    if (error.includes('idx_model_name')) {
      return 'Name must be unique (case insensitive)'
    }

    if (error.includes('idx_equipment_serial_number')) {
      return 'Serial Number must be unique (case insensitive)'
    }
  }

  return error
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

const index = (resource, success, failure) => {
  attachInterceptors()
  return axios
    .get(`${process.env.LAMBDA_ENDPOINT}${resource}`)
    .then(result => {
      const converted = result.data.body.map(elem => convertObject(elem))
      success(converted)
    })
    .catch(error => {
      failure(error.response.data)
    })
}

const show = (resource, id, success, failure) => {
  attachInterceptors()
  return axios
    .get(`${process.env.LAMBDA_ENDPOINT}${resource}?id=${id}`)
    .then(result => {
      success(convertObject(result.data.body))
    })
    .catch(error => {
      failure(error.response.data)
    })
}

const getNew = (resource, success, failure) => {
  attachInterceptors()
  return axios
    .get(`${process.env.LAMBDA_ENDPOINT}${resource}?new=true`)
    .then(result => {
      success(convertObject(result.data.body))
    })
    .catch(error => {
      failure(error.response.data)
    })
}

export const createEquipment = (data, success, failure) => {
  attachInterceptors()
  return axios
    .post(`${process.env.LAMBDA_ENDPOINT}equipment`, data)
    .then(response => {
      success(response.data.body)
    })
    .catch(error => {
      failure(translateError(error.data.body))
    })
}

export const createModel = (data, success, failure) => {
  attachInterceptors()
  return axios
    .post(`${process.env.LAMBDA_ENDPOINT}models`, data)
    .then(response => {
      success(response.data.body)
    })
    .catch(error => {
      failure(translateError(error.data.body))
    })
}

export const createOem = (data, success, failure) => {
  attachInterceptors()
  return axios
    .post(`${process.env.LAMBDA_ENDPOINT}oems`, data)
    .then(response => {
      success(response.data.body)
    })
    .catch(error => {
      failure(translateError(error.data.body))
    })
}

export const createType = (data, success, failure) => {
  attachInterceptors()
  return axios
    .post(`${process.env.LAMBDA_ENDPOINT}types`, data)
    .then(response => {
      success(response.data.body)
    })
    .catch(error => {
      failure(translateError(error.data.body))
    })
}

const dummy = (success, failure) => {
  success({})
}

export default {
  index,
  show,
  getNew,
  createEquipment,
  createModel,
  createOem,
  createType,
  dummy,
  convertObject,
}
