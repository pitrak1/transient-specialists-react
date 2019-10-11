import axios from 'axios'
import utils from './utils'

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

  if (error.includes('violates foreign key constraint')) {
    if (error.includes('equipments_model_id_fkey')) {
      return 'Model cannot be deleted because it has related equipment'
    }

    if (error.includes('equipments_type_id_fkey')) {
      return 'Type cannot be deleted because it has related equipment'
    }

    if (error.includes('models_oem_id_fkey')) {
      return 'OEM cannot be deleted because it has related models'
    }
  }

  return error
}

const getIndex = (resource, options, success, failure) => {
  attachInterceptors()
  const { ascending, page, perPage, searchValue, sortBy } = options
  return axios
    .get(
      `${
        process.env.LAMBDA_ENDPOINT
      }${resource}?ascending=${ascending}&page=${page}&perPage=${perPage}&searchValue=${searchValue}&sortBy=${utils.pascalToSnake(
        sortBy,
      )}`,
    )
    .then(result => {
      success(utils.convertObject(result.data.body))
    })
    .catch(error => {
      failure(error.data.body)
    })
}

const getShow = (resource, id, options, success, failure) => {
  attachInterceptors()
  const { ascending, page, perPage, sortBy } = options
  return axios
    .get(
      `${
        process.env.LAMBDA_ENDPOINT
      }${resource}?id=${id}&ascending=${ascending}&page=${page}&perPage=${perPage}&sortBy=${utils.pascalToSnake(
        sortBy,
      )}`,
    )
    .then(result => {
      success(utils.convertObject(result.data.body))
    })
    .catch(error => {
      failure(error.data.body)
    })
}

const getNew = (resource, success, failure) => {
  attachInterceptors()
  return axios
    .get(`${process.env.LAMBDA_ENDPOINT}${resource}?new=true`)
    .then(result => {
      success(utils.convertObject(result.data.body))
    })
    .catch(error => {
      failure(error.data.body)
    })
}

export const postCreate = (resource, data, success, failure) => {
  attachInterceptors()
  return axios
    .post(`${process.env.LAMBDA_ENDPOINT}${resource}`, data)
    .then(response => {
      success(response.data.body)
    })
    .catch(error => {
      failure(translateError(error.data.body))
    })
}

export const patchUpdate = (resource, data, success, failure) => {
  attachInterceptors()
  return axios
    .patch(`${process.env.LAMBDA_ENDPOINT}${resource}`, data)
    .then(response => {
      success(response.data.body)
    })
    .catch(error => {
      failure(translateError(error.data.body))
    })
}

export const deleteDestroy = (resource, id, success, failure) => {
  attachInterceptors()
  return axios
    .delete(`${process.env.LAMBDA_ENDPOINT}${resource}?id=${id}`)
    .then(response => {
      success(response.data.body)
    })
    .catch(error => {
      failure(translateError(error.data.body))
    })
}

export default {
  getIndex,
  getShow,
  getNew,
  postCreate,
  patchUpdate,
  deleteDestroy,
}
