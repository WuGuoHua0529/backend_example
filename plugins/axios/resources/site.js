export default axios => {
  const baseUrl = process.env.API_URL

  return {
    siteList: data => axios.get(`${baseUrl}/site/list`, data), // 清單
    sitePeople: data => axios.get(`${baseUrl}/site/people`, data), // 登入人资料
  }
}
