export default axios => {
  const baseUrl = process.env.API_URL

  return {
    announcement: data => axios.get(`${baseUrl}/front/announcement`, data), // 公告
    setAnnouncement: data => axios.post(`${baseUrl}/front/setAnnouncement`, data), // 設定公告
    commodity: data => axios.get(`${baseUrl}/front/commodity`, data), // 商品清單
    setCommodity: data => axios.post(`${baseUrl}/front/setCommodity`, data), // 設定商品狀態
    setCommodityInfor: data => axios.post(`${baseUrl}/front/setCommodityInfor`, data), // 修改商品
  }
}
