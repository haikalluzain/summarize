import Axios from 'axios'

export const Api = (base?: string) => {
  let baseUrl = '/api'
  if (base === 'ES') {
    baseUrl = 'http://localhost:5000'
  }
  const APi = Axios.create({
    baseURL: baseUrl,
  })

  APi.interceptors.response.use(
    (succes) => succes,
    (err) => {
      if (err.response && err.response.data) {
        throw { ...err.response.data, code: err.response.status }
      }
      throw err
    }
  )

  return APi
}
