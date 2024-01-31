import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
    isLoggedIn: false,
  },
  getters: {
    
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isLoggedIn = true; // Cambia a true cuando el usuario inicia sesión
    },
    clearToken(state) {
      state.token = null;
      state.isLoggedIn = false; // Cambia a false cuando el usuario cierra sesión
    },
  },
  actions: {
    
  },
  modules: {},
});
