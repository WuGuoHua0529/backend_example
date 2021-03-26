import resources from './resources'
const packageData = (data) => {
  const _formData = new FormData()
  Object.keys(data).forEach(key => {

    let value = typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]
    _formData.append(key, value)

  })
  return _formData
}
export default function ({ $axios, redirect, app }, inject) {

  $axios.interceptors.request.use(
    config => {
      // do something before request is sent
      return config
    },
    error => {
      // do something with request error
      return Promise.reject(error)
    }
  )
  $axios.onRequest(config => {
    // console.log('Making request to ' + config.url)
    let userData = app.$cookies.get('userData');
    if (typeof userData !== 'undefined') {
      config.headers.operator = (typeof userData.operator_id !== 'undefined') ? userData.operator_id : null
    } else {
      config.headers.operator = null
    }
  })
  // response interceptor
  $axios.interceptors.response.use(
    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
      const res = response.data
      if (response.status === 200) {
        // if (Number(res.status.code) !== 0) {
        //   // eslint-disable-next-line no-throw-literal
        //   throw { response: { status: 500, code: res.status.code } }
        // }
        return res
      } else {
        redirect('/404')
        // if the custom code is not 200, it is judged as an error.
      }
      // return Promise.reject(new Error(res.msg || 'Error'))
    },
    error => {
      console.error('err' + error) // for debug

      return Promise.reject(error)
    }
  )
  // $axios.onFormPut((url, params) => {

  // })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // redirect('/404')
    } else if (code === 500) {
      // redirect('/500')
      // redirect('/error')
    }
  })
  if (!$axios) {
    console.error('Please make sure $axios module is added')
  } else {
    inject('api', resources($axios))
  }
}
