import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import res from './response'

const mock = new MockAdapter(axios)
//登入者状态
mock.onPost(`${process.env.API_URL}/loginUser`).reply(res.login.loginUserStaus)
//站点
mock.onGet(`${process.env.API_URL}/site/list`).reply(res.site.siteList)

mock.onAny().passThrough()
