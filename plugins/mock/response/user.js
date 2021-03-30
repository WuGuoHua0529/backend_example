let List = {
    list: [
      {
        key: '1',
        user: 'chen',
        name: '陈小马',
        ip: '111.111.222.145',
        logdate: '2021-01-01',
        status: 1,
      },
      {
        key: '2',
        user: 'how r me',
        name: '胡阿明',
        ip: '123.456.123.789',
        logdate: '2021-01-02',
        status: 1,
      },
      {
        key: '3',
        user: 'cc lo run',
        name: '菜红罗',
        ip: '123.123.123.122',
        logdate: '2021-01-03',
        status: 0,
      }
    ]
}

const LogList = [
  {
    key: '1',
    logRecord: [
      { logStart: '2020-12-21 10:20:08', logEnd: '2020-12-22 11:35:15'},
      { logStart: '2021-02-05 12:51:31', logEnd: '2021-02-07 00:10:24'},
      { logStart: '2021-03-03 05:10:29', logEnd: '2021-03-12 20:15:32'},
      { logStart: '2021-03-14 13:10:29', logEnd: '2021-03-16 15:50:32'},
      { logStart: '2021-03-23 20:10:29', logEnd: '2021-03-23 20:51:33'},
      { logStart: '2021-03-29 01:10:29', logEnd: '2021-03-29 20:11:12'}
    ]
  },
  {
    key: '2',
    logRecord: [
      { logStart: '2020-12-21 10:20:08', logEnd: '2020-12-22 11:35:15'},
      { logStart: '2021-02-05 12:51:31', logEnd: '2021-02-07 00:10:24'},
      { logStart: '2021-03-03 15:10:35', logEnd: '2021-03-05 20:50:32'},
      { logStart: '2021-03-12 05:10:29', logEnd: '2021-03-19 12:15:20'}
    ]
  },
  {
    key: '3',
    logRecord: [
      { logStart: '2020-12-21 10:20:08', logEnd: '2020-12-22 11:35:15'},
      { logStart: '2021-02-05 12:51:31', logEnd: '2021-02-07 00:10:24'},
    ]
  }
]


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

//post
const requestData = (data) => {
  data = JSON.parse(data)
  List.list.forEach(it => {
    if (it.key == data.key) {
      it.user = data.useracc
      it.name = data.username
    }
  });
}

const post_promiseStructure = ({ url, data }) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        200,
        {
          data: requestData(data),
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

const userList = data => promiseStructure(List)
const userLogList = data => promiseStructure(LogList)
const useredit = data => post_promiseStructure(data)

export default {
  userList,
  userLogList,
  useredit
}