import Vue from 'vue'
import App from './App.vue'
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import store from './vuex-store.js'

export const SocketInstance = new SocketIO('http://localhost:5000'); //todo replace this with environment variable

Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketInstance,
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      // mutationPrefix: "SOCKET_" websocket messages should not be doing mutations directly
    },
  }));

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
