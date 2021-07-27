const state = () => ({
  categories: [],
  details: {}
});
let mutations = {
  DATA(state, categories) {
    state.categories = categories;
  },
  DETAILS(state, details) {
    state.details = details;
  },
  CREATED(state) {},
  SHOW(state) {}
};
let actions = {
  async Data({ commit }) {
    let data = await this.$axios.get(`/categories`);
    commit("DATA", data.data.data);
  
  },
  async Details({ commit }, id) {
    let data = await this.$axios.get(`/category/${id}/show`);
    commit("DETAILS", data.data.data);
  },

  async Created({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`category/store`, data)
        .then(result => {
          resolve(result);
          commit("CREATED");
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  async Update({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`category/update`, data)
        .then(result => {
          resolve(result);
          commit("CREATED");
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  Delete({ commit }, id) {
    console.log(id);
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`category/remove`, id)
        .then(result => {
          resolve(result);
          commit("SHOW", result.data.category);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
let getters = {};

export default {
  state,
  getters,
  actions,
  mutations
};
