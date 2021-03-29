export default axios => {
  const baseUrl = process.env.API_URL

  return {
    userList: data => axios.get(`${baseUrl}/user/list`, data), // 清單
    userLogList: data => axios.get(`${baseUrl}/user/loglist`, data), // 登入人资料
  }
}
