import Vuex from 'vuex'

import state from '@/store/state.js'
import actions from '@/store/actions.js'
import mutations from '@/store/mutations.js'
import getters from '@/store/getters.js'

const createStore = () => {
  return new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules: {}
  })
}
export default createStore
