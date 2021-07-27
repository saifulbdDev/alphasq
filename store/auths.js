const state = () => ({
  errors: []
});

let mutations = {
  // CHECK_VALIDATION(state, validation) {
  //   state.validation = validation;
  // },
  REGISTER(state, errors) {
    state.errors = errors;
  }
};
let actions = {
  // async CheckValid({commit},  valid){
  //   let data = await this.$axios.post(`/author/check/${valid.type}`, valid.value)
  //   commit('CHECK_VALIDATION', data);
  // },
  async Registrar({ commit }, reg_data) {
    let data = await this.$axios.post(`/register`, reg_data);
    if (data.data.success) {
      await this.$auth.loginWith("local", {
        data: {
          email: reg_data.email,
          password: reg_data.password
        }
      });
    }
    else if (data.data.errors) {
      commit("REGISTER", data.data.errors);
    }
  }
};
let getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },

  loggedInUser(state) {
    return state.auth.user;
  }
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
};
