import login from './login'
import site from './site'
import account from './account'

export default axios => {
  const baseUrl = process.env.API_URL
  return {
    login: login(axios),
    site: site(axios),
    account: account(axios)
  }
}
