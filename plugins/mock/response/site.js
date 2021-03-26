const List = {
    list: [
      {
        user: 'chen',
        name: '陈小马',
        ip: '111.111.222.145',
        logdate: '2021-01-01',
        status: 1,
      },
      {
        user: 'how r me',
        name: '胡阿明',
        ip: '123.456.123.789',
        logdate: '2021-01-02',
        status: 1,
      },
      {
        user: 'cc lo run',
        name: '菜红罗',
        ip: '123.123.123.122',
        logdate: '2021-01-3=03',
        status: 0,
      }
    ]
}

const People = {
  people: 10
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

const siteList = data => promiseStructure(List)
const sitePeople = data => promiseStructure(People)

export default {
  siteList,
  sitePeople
}