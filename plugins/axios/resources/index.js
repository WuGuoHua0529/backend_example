import login from './login'
import user from './user'
import account from './account'

export default axios => {
  const baseUrl = process.env.API_URL
  return {
    login: login(axios),
    user: user(axios),
    account: account(axios)
  }
}
