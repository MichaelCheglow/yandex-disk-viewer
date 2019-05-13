import Vue from 'vue'
import Vuex from 'vuex'

import state from './state.js'
import mutations from './mutations.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state,
    mutations
})
