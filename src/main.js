import Vue from 'vue'
import App from './App.vue'
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import store from './vuex-store.js'
import VueCookies from 'vue-cookies';

//todo graceful handling of sigterm
let api = ""
if (typeof process.env.VUE_APP_API_URL !== 'undefined'){
    api = process.env.VUE_APP_API_URL.toString();
}else {
    api = "http://localhost:5000"; // nodejs ENVs and heroku ENVs seem mutually exclusive,
    // removing file.ENV and hardcoding the local case
}
export const SocketInstance = new SocketIO(api);

Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketInstance,
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      // mutationPrefix: "SOCKET_"   websocket messages should not be doing mutations directly
    },
  }));
Vue.use(VueCookies)
Vue.$cookies.config('14d')
Vue.$cookies.set("user", "blah")
// todo store the authenticated user token here and then somehow send it to backend for continual session

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
