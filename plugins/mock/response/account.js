const List = {
    data: {
      list: [
        {
          username: '1',
          memname: 'opmc',
          ip: '公司',
          browser: 'AAAA0001',
          country: 'KIWI',
          logdate: '运营专用',
          state: 1,
          changeStatus: false
        },
        {
          username: '2',
          memname: 'GG',
          ip: '台机电',
          browser: 'AAAA000188',
          country: 'KIWI5',
          logdate: '赌博专用',
          state: 2,
          changeStatus: false
        },
        {
          username: '3',
          memname: 'ADSL',
          ip: '申装',
          browser: 'AAAA897979',
          country: 'KIWI3',
          logdate: '爱滋病专用',
          state: 1,
          changeStatus: false
        }
      ]
    },
}

const ManagementList = {
  data: {
    list: [
      {
        username: '1',
          memname: 'OPMC',
          country: '营运',
          logdate: '只能给营运单位使用',
          state: 1,
      },
      {
        username: '3',
        memname: 'OPMC87',
        country: '公司',
        logdate: '只能给公司单位使用',
        state: 1,
      },
      {
        username: '3',
        memname: 'OPMC66',
        country: '打杂',
        logdate: '只能给答杂单位使用',
        state: 1,
      }
    ]
  },
}

const promiseStructure = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        200,
        {
          data: data,
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

const accountList = data => promiseStructure(List)
const authorityManagementList = data => promiseStructure(ManagementList)

export default {
  accountList,
  authorityManagementList
}