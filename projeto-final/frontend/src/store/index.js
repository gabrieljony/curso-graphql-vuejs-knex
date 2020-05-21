import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { usuario: null },
  getters: {
    usuario(state) {
      return state.usuario;
    },
  },
  mutations: {
    setUsuario(state, usuario) {
      state.usuario = usuario;
    },
  },
  actions: {
    setUsuario({ commit }, usuario) {
      commit("setUsuario", usuario);
    },
  },
  modules: {},
});
