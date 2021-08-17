<template>
  <div>
    <form v-on:submit.prevent="onSubmit" rel="noopener noreferrer nofollow">
      <p v-if="isConnected">Websocket Connected</p>

      <input v-model="username" placeholder="username" autocomplete="username">
      <input v-model="password" placeholder="password" type="password" autocomplete="password">
      <div v-show="register">
        <input v-model="email" placeholder="email" autocomplete="email">
        <p>Email is only collected for password recovery later, it's stored as securely as your
          password and we won't send it to anyone else</p>

      </div>
      <button @click="onSubmit(username, password, email)" ref="submit">Login</button>

      <p>{{ loginMessage }}</p>
    </form>
    <p>
      <button @click="registerFunc()" ref="Register">Register for new account</button>
    </p>
  </div>
</template>

<script>
import store from "@/vuex-store";

export default {
  name: "Login",
  data: function () {
    return {
      register: false,
      email: "",
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/, // eslint-disable-line
    }
  },
  computed: {
    isConnected() {
      return store.getters.isConnected;
    },
    loginMessage: {
      get() {
        return store.getters.loginMessage;
      },
      set(value) {
        return store.dispatch('setloginMessage', value);
      },
    },
    username: {
      get() {
        return store.getters.username;
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
    onSubmit: function (username, password, email) { //authenticate or register
      let data = {}
      data['password'] = password;
      data['username'] = username;
      if (this.register) {
        data['email'] = email;
        if (typeof data['username'] === "string" && typeof data['password'] === "string" && this.reg.test(data['email']) && data['password'].length >= 12) {
          this.$socket.emit('register', data)
        } else {
          this.loginMessage = "Please enter a valid username, password over 12 characters, and email"
        }
      } else {
        if (typeof data['username'] === "string" && typeof data['password'] === "string" && data['password'].length >= 12) {
          this.$socket.emit('authenticate', data)
        } else {
          this.loginMessage = "Please enter a valid username and password"
        }
      }

      // this.loginMessage = "Trying to login"
    },
    registerFunc: function () {
      this.loginMessage = this.register ? "Welcome, please log in" : "Welcome, please register"
      this.$refs.Register.innerText = this.register ? "Register for new account" : "Back to regular login"
      this.$refs.submit.innerText = this.register ? "Login" : "Register"
      this.register = !this.register

    }
  },
}
</script>

<style scoped>

</style>