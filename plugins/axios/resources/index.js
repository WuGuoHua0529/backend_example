import login from './login'
import user from './user'
import front from './front'

export default axios => {
  const baseUrl = process.env.API_URL
  return {
    login: login(axios),
    user: user(axios),
    front: front(axios)
  }
}
