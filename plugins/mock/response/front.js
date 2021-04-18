let announcementData = "測試用公告訊息拉哈哈哈!"
let commodityData = {
  list: [
    {
      key: 1,
      check: false,
      name: '韓系刷毛大衣',
      money: 2600,
      up: true,
    },
    {
      key: 2,
      check: false,
      name: '單寧牛仔外套【深藍】',
      money: 1499,
      up: true,
    },
    {
      key: 3,
      check: false,
      name: '單寧刷破牛仔褲【藍】',
      money: 899,
      up: true,
    },
    {
      key: 4,
      check: false,
      name: '純棉潮流外套x聯名suqer【白】',
      money: 2600,
      up: true,
    },
    {
      key: 5,
      check: false,
      name: 'MP-LOGO-圓領T恤',
      money: 700,
      up: true,
    }
  ]
}

const promiseStructure = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        200,
        {
          data: data,
          status: {
            message: 'success',
            timestamp: parseInt(+new Date() / 1000)
          }
        }
      ])
    }, 500)
  })
}

const requestAnnouncementData = (data) => {
  announcementData = data
}

const post_promiseStructure = ({ url, data }) => {
  data = JSON.parse(data)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        200,
        {
          data: requestAnnouncementData(data.infor),
          status: {
            code: '0',
            message: 'success',
            timestamp: parseInt(+new Date() / 1000)
          }
        }
      ])
    }, 500)
  })
}

const requestCommodity = (data) => {
  commodityData.list.forEach(item => {
    if (data.changeArray.some(it=> it == item.key)) {
      item.up = data.status == 1 ? true : false
    }
  });
}

const post_Commodity = ({ url, data }) => {
  data = JSON.parse(data)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        200,
        {
          data: requestCommodity(data),
          status: {
            code: '0',
            message: 'success',
            timestamp: parseInt(+new Date() / 1000)
          }
        }
      ])
    }, 500)
  })
}

const requestCommodityInfor = (data) => {
  commodityData.list.forEach(item => {
    if (data.key == item.key) {
      item.name = data.name
      item.money = data.money
    }
  });
}

const post_CommodityInfor = ({ url, data }) => {
  data = JSON.parse(data)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        200,
        {
          data: requestCommodityInfor(data),
          status: {
            code: '0',
            message: 'success',
            timestamp: parseInt(+new Date() / 1000)
          }
        }
      ])
    }, 500)
  })
}

const announcement = data => promiseStructure(announcementData)
const setAnnouncement = data => post_promiseStructure(data)
const commodity = data => promiseStructure(commodityData)
const setCommodity = data => post_Commodity(data)
const setCommodityInfor = data => post_CommodityInfor(data)

export default {
  announcement,
  setAnnouncement,
  commodity,
  setCommodity,
  setCommodityInfor
}