import qs from 'qs'
export default axios => {
  const baseUrl = process.env.ENV_API_URL
  const quotaTemplateUrl = `${baseUrl}`

  return {
    accountList: (data) => {
      let params = {}
      let arr = ['', undefined]
      for (let key in data) {
        if (arr.every(it => it != String(data[key]))) params[key] = data[key]
      }
      return axios.get(`${baseUrl}/operator/auth/user/list?${qs.stringify(params)}`)
    }, //帳號列表
    authorityManagementList: (data) => {
      let params = {}
      let arr = ['', undefined]
      for (let key in data) {
        if (arr.every(it => it != String(data[key]))) params[key] = data[key]
      }
      return axios.onGet(`${baseUrl}/operator/auth/group/list?${qs.stringify(params)}`)
    }, //权限管理列表
    logRecord: (data, pageObj) => axios.get(`${baseUrl}/operator/auth/user/log-record/${data}?${qs.stringify(pageObj)}`), //帐号列表-操作纪录
    groupLogRecord: (data, pageObj) => axios.get(`${baseUrl}/operator/auth/group/log-record/${data}?${qs.stringify(pageObj)}`), //帐号列表-操作纪录
    groupUpPage: (data) => axios.get(`${baseUrl}/operator/auth/group/update-page/${data}`), //权限修改页面
    groupInfo: (data) => axios.get(`${baseUrl}/operator/auth/group/auth-info`), //权限列表-权限资讯列表
    resetPassword: (data) => axios.put(`${baseUrl}/operator/auth/user/reset-password`, data), //重设密码
    changeStatus: (data) => axios.put(`${baseUrl}/operator/auth/user/status`, data), //帐号修改-状态
    changeGroupStatus: (data) => axios.put(`${baseUrl}/operator/auth/group/status`, data), //帐号修改-状态
    changeUpdate: (data) => axios.put(`${baseUrl}/operator/auth/user/update`, data), //帐号修改-名称/权限
    groupInsert: (data) => axios.post(`${baseUrl}/operator/auth/group/insert`, data), //权限新增
    userInsert: (data) => axios.post(`${baseUrl}/operator/auth/user/insert`, data), //帐号新增
    groupUpdate: (data) => axios.put(`${baseUrl}/operator/auth/group/update`, data), //权限修改
    groupAll: (data) => axios.get(`${baseUrl}/operator/auth/group/all`, data), //权限修改
  }
}
