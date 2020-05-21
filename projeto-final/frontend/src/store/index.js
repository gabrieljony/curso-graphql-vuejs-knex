import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { usuario: null },
  getters: {
    usuario(state) {
      return state.usuario
    }
  },
  mutations: {
    setUsuario(state, usuario) {
      state.usuario = usuario
    }
  },
  actions: {
    setUsuario({ commit }, usuario) {
      if (usuario && usuario.token) {
        localStorage.setItem('token', usuario.token)
      } else {
        localStorage.removeItem('token')
      }
      commit('setUsuario', usuario)
    }
  },
  modules: {}
})
