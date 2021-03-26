const modulesFiles = require.context('.', true, /\.js$/) // if can't understand, plz google `webpack require.context`

// auto import all `./api/*.js` file,
const modules = modulesFiles.keys()
  .reduce((modules, modulePath) => {
    if (modulePath.indexOf('index') > 0) return modules // 懶得改正則, 這裏阻擋遍歷到自己 `index.js`

    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1') // $1: 取第一個括號中的內容
    const value = modulesFiles(modulePath)

    modules[moduleName] = value.default

    return modules
  }, {})
export default modules
