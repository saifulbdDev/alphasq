const state = () => ({
    articles: [],
    details: {}
  });
  let mutations = {
    DATA(state, articles) {
      state.articles = articles;
    },
    DETAILS(state, details) {
      state.details = details;
    },
    CREATED(state) {},
    SHOW(state) {}
  };
  let actions = {
    async Data({ commit }) {
      let data = await this.$axios.get(`/articles`);
      commit("DATA", data.data.data);
    
    },
    async Details({ commit }, id) {
      let data = await this.$axios.get(`/article/${id}/show`);
      commit("DETAILS", data.data.data);
    },
  
    async Created({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$axios
          .post(`article/store`, data)
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
          .post(`article/update`, data)
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
          .post(`article/remove`, id)
          .then(result => {
            resolve(result);
            commit("SHOW", result.data.article);
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
  