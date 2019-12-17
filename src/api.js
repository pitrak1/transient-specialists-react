import axios from 'axios'
import utils from './utils'

let instance
const getAxios = () => {
  if (!instance) {
    instance = axios.create({
      baseURL: process.env.LAMBDA_ENDPOINT,
      headers: { 'X-Api-Key': process.env.LAMBDA_API_KEY },
      timeout: 10000,
    })

    instance.interceptors.response.use(
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

  return instance
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
  const axios = getAxios()
  const { ascending, page, perPage, searchValue, sortBy, hideSold } = options
  return axios
    .get(
      `${resource}?ascending=${ascending}&page=${page}&perPage=${perPage}&searchValue=${searchValue}&sortBy=${utils.pascalToSnake(
        sortBy,
      )}&hideSold=${hideSold}`,
    )
    .then(result => {
      if (result.data.body) {
        success(utils.snakeToPascalObject(result.data.body))
      } else {
        failure(result.data.errorMessage)
      }
    })
    .catch(error => {
      failure(error.data.body)
    })
}

const getShow = (resource, id, options, success, failure) => {
  const axios = getAxios()
  const { ascending, page, perPage, sortBy } = options
  return axios
    .get(
      `${resource}?show=true&id=${id}&ascending=${ascending}&page=${page}&perPage=${perPage}&sortBy=${utils.pascalToSnake(
        sortBy,
      )}`,
    )
    .then(result => {
      if (result.data.body) {
        success(utils.snakeToPascalObject(result.data.body))
      } else {
        failure(result.data.errorMessage)
      }
    })
    .catch(error => {
      failure(error.data.body)
    })
}

const getEdit = (resource, id, success, failure) => {
  const axios = getAxios()
  return axios
    .get(`${resource}?edit=true&id=${id}`)
    .then(result => {
      if (result.data.body) {
        success(utils.snakeToPascalObject(result.data.body))
      } else {
        failure(result.data.errorMessage)
      }
    })
    .catch(error => {
      failure(error.data.body)
    })
}

const getNew = (resource, success, failure) => {
  const axios = getAxios()
  return axios
    .get(`${resource}?new=true`)
    .then(result => {
      if (result.data.body) {
        success(utils.snakeToPascalObject(result.data.body))
      } else {
        failure(result.data.errorMessage)
      }
    })
    .catch(error => {
      failure(error.data.body)
    })
}

const postCreate = (resource, data, success, failure) => {
  const axios = getAxios()
  return axios
    .post(`${resource}`, data)
    .then(result => {
      if (result.data.body) {
        success(utils.snakeToPascalObject(result.data.body))
      } else {
        failure(result.data.errorMessage)
      }
    })
    .catch(error => {
      failure(translateError(error.data.body))
    })
}

const patchUpdate = (resource, data, success, failure) => {
  const axios = getAxios()
  return axios
    .patch(`${resource}`, data)
    .then(result => {
      if (result.data.body) {
        success(utils.snakeToPascalObject(result.data.body))
      } else {
        failure(result.data.errorMessage)
      }
    })
    .catch(error => {
      failure(translateError(error.data.body))
    })
}

const deleteDestroy = (resource, id, success, failure) => {
  const axios = getAxios()
  return axios
    .delete(`${resource}?id=${id}`)
    .then(result => {
      if (result.data.body) {
        success(utils.snakeToPascalObject(result.data.body))
      } else {
        failure(result.data.errorMessage)
      }
    })
    .catch(error => {
      failure(translateError(error.data.body))
    })
}

const getReport = (report, success, failure) => {
  const axios = getAxios()
  return axios
    .get(`reports?reportName=${report}`)
    .then(result => {
      if (result.data.body) {
        success(utils.snakeToPascalObject(result.data.body))
      } else {
        failure(result.data.errorMessage)
      }
    })
    .catch(error => {
      failure(error.data.body)
    })
}

export default {
  getIndex,
  getShow,
  getEdit,
  getNew,
  postCreate,
  patchUpdate,
  deleteDestroy,
  getReport,
}
