import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Qs from 'qs';
import Axios from 'axios';

var bus = new Vue();
export default bus

new Vue({
  router,
  store,
  methods:{
    isOnline:function(){
      var url = 'http://127.0.0.1:3000/user/isonline';
      Axios.get(url)
          .then(res=>{
              console.log(res.data);
          })
          .catch(err=>{
              console.log(err);
          })
    },
  },
  render: h => h(App)
}).$mount('#app')



