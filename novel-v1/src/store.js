import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    online:0,
    uname:'',
  },
  getters:{
    consoleOnline:state => {
      console.log('state Online' + state.online);
    }
  },
  mutations: {
    getOnline:state => {
      ++ state.online;
      return state.online;
    },
    getUname:state => {
      return state.uname;
    }
  },
  actions: {
    getOnline:context => {
      context.commit('getOnline');
    },
    getUname:context => {
      context.commit('getUname');
    }
  }
})
