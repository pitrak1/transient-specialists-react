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

const getEquipment = (success, failure) => {
  attachInterceptors()
  axios
    .get(`${process.env.LAMBDA_ENDPOINT}getEquipment`)
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })
}

export default { getEquipment }
