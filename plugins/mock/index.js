import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import res from './response'

const mock = new MockAdapter(axios)
//登入者状态
mock.onPost(`${process.env.API_URL}/loginUser`).reply(res.login.loginUserStaus)
//使用者
mock.onGet(`${process.env.API_URL}/user/list`).reply(res.user.userList)
mock.onGet(`${process.env.API_URL}/user/loglist`).reply(res.user.userLogList)
mock.onPost(`${process.env.API_URL}/user/edit`).reply(res.user.useredit)
//前台 公告
mock.onGet(`${process.env.API_URL}/front/announcement`).reply(res.front.announcement)
mock.onPost(`${process.env.API_URL}/front/setAnnouncement`).reply(res.front.setAnnouncement)
//前台 商品
mock.onGet(`${process.env.API_URL}/front/commodity`).reply(res.front.commodity)
mock.onPost(`${process.env.API_URL}/front/setCommodity`).reply(res.front.setCommodity)
mock.onPost(`${process.env.API_URL}/front/setCommodityInfor`).reply(res.front.setCommodityInfor)

mock.onAny().passThrough()
