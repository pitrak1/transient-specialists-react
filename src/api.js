import axios from 'axios'
let ENV
import('../env.js')
  .then(result => {
    ENV = result.default
  })
  .catch(e => {
    ENV = process.env
  })

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

const getEquipment = (success, failure) => {
  attachInterceptors()
  axios
    .get(`${ENV.LAMBDA_ENDPOINT}test`, {
      serialNumber: 'TESTSTST1',
      modelId: 1,
      typeId: 1,
    })
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })
}

export default { getEquipment }
