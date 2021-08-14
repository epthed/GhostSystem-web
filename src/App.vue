<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Main msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import main from './components/Main.vue'
import store from './vuex-store.js'

export default {
  name: 'App',
  components: {
    'Main': main
  },
  beforeCreate() {
    store.commit('setSocket', this.$socket)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
