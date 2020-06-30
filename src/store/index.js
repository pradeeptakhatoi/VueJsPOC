import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    "users": [],
    "usersFetched": false
  },
  plugins: [new VuexPersistence().plugin],
  mutations: {
    addUser(state, user) {
      state.users.push(user)
    },
    editUser(state, user) {
      const index = state.users.findIndex((u) => u.id === user.id);
      state.users[index] = user;
    },
    deleteUser(state, deletedUser) {
      state.users = state.users.filter((user) => user.id !== deletedUser.id);
    },
    updateUserList(state, users) {
      state.users = users;
    },
    updateUsersFetched(state, status) {
      state.usersFetched = status;
    },
  },
  actions: {   
    getUserList(context) {
      axios.get(`http://localhost:3000/users`).then(res => {
        context.commit('updateUserList', res.data);
        context.commit('updateUsersFetched', true);
      }, error => {
        console.log(error);
        context.commit('updateUserList', []);
        context.commit('updateUsersFetched', false);
      });
    },
    deleteUser(context, user) {
      axios.delete(`http://localhost:3000/users/${user.id}`).then(() => {
        context.commit('deleteUser', user);
      }, error => {
        console.log(error);
      });
    }
  },
  getters: {
    getUser: (state) => (id) => {
      return state.users.find(user => user.id === id)
    }
  },
  modules: {
  }
})
