export default axios => {
  const baseUrl = process.env.API_URL

  return {
    loginUser: data => axios.post(`${baseUrl}/loginUser`, data), // 遊戲清單
  }
}
