import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
  },
  getters: {
    getToken(){
      return state.token;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    setToken(context, token) {
      context.token = token;
    },
  },
  modules: {},
});
