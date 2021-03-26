export default {
  upUserToken({commit}, value) {
    commit('setUserToken', value)
  },
  upUserLoid({commit}, value) {
    commit('setUserLoid', value)
  }
}