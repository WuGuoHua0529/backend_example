const promiseStructure = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        200,
        {
          data: true,
          status: {
            message: 'success',
            timestamp: parseInt(+new Date() / 1000)
          }
        }
      ])
    }, 500)
  })
}

const loginUserStaus = data => promiseStructure()

export default {
  loginUserStaus,
}