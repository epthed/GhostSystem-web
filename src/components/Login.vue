<template>
  <form v-on:submit.prevent="onSubmit" rel="noopener noreferrer nofollow">
    <p v-if="isConnected">Websocket Connected</p>
    <input v-model="userName" placeholder="username" autocomplete="username">
    <input v-model="password" placeholder="password" type="password" autocomplete="password">

    <button @click="onSubmit(userName, password)">Register/login</button>
    <p>{{ loginMessage }}</p>
  </form>
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
    onSubmit: function (userName, password) { //authenticate
      let data = {}
      data['password'] = password;
      data['username'] = userName;
      this.$socket.emit('authenticate', data)
      this.loginMessage = "Trying to login"
    },
  },
}
</script>

<style scoped>

</style>