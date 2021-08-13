<template>
  <div>
    <p v-if="isConnected">Websocket Connected</p>
    <input v-model="userName" placeholder="username">
    <input v-model="password" placeholder="password" type="password">

    <button @click="authenticate(userName, password)">Register/login</button>
    <p>{{ loginMessage }}</p>
  </div>
</template>

<script>
import store from "@/vuex-store";

export default {
  name: "Login",
  data() {
    return {}
  },
  computed: {
    isConnected() {
      return store.getters.isConnected;
    },
    loginMessage: {
      get() {
        return store.getters.loginMessage;
      },
      set() {
        return "Please try to log in";
      },
    },
    userName: {
      get() {
        return store.getters.userName;
      },
      set(value) {
        return store.dispatch('setUserName', value)
      }
    },
    password: {
      get() {
        return store.getters.password;
      },
      set(value) {
        return store.dispatch('setPassword', value)
      }
    },
  },
  methods: {
    authenticate: function (userName, password) {
      let data = {}
      data['password'] = password;
      data['username'] = userName;
      this.$socket.emit('authenticate', data)
      this.loginMessage = "Trying to login"
    },
  }
}
</script>

<style scoped>

</style>