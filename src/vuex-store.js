import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnected: false,
    Authenticated: false,
    loginMessage: 'Welcome, please try to log in',
    socketMessage: '',
    characterName: '',
    username: '',
    password: '',
    map: {},
    musicPlaying: false,
    io: {},
  },


  getters: {
    isConnected: state => {
      return state.isConnected
    },
    Authenticated: state => {
      return state.Authenticated
    },
    loginMessage: state => {
      return state.loginMessage
    },
    characterName: state => {
      return state.characterName
    },
    musicPlaying: state => {
      return state.musicPlaying
    },
    username: state => {
      return state.username
    },
    password: state => {
      return state.password
    },
    socketMessage: state => {
      return state.socketMessage
    },
    map: state => {
      return state.map
    },
  },

  mutations: { // mutation is the only way to modify state, doesn't care about business logic. Synchronous. are committed
    connect(state) {
      state.isConnected = true;

    },
    disconnect(state) {
      state.isConnected = false;
    },
    setSocket: (state, socket) => {
      state.io = socket
    },
    auth_success(state, message) {
      state.Authenticated = true;
      state.loginMessage = message.message;
      state.password = "";
      Vue.$cookies.remove("user");
      Vue.$cookies.set("user", message.username);
      Vue.$cookies.remove("auth_token");
      Vue.$cookies.set("auth_token", message.auth_token);

    },
    auth_fail(state, message) {
      state.Authenticated = false;
      state.loginMessage = message;
    },

    mutate_characterName(state, message) {
      state.characterName = message
    },
    mutate_musicPlaying(state, message) {
      state.musicPlaying = message
    },
    mutate_loginMessage(state, message) {
      state.loginMessage = message
    },
    mutate_username(state, message) {
      state.username = message
    },
    mutate_password(state, message) {
      state.password = message
    },
    mutate_map(state, message) {
      state.map = message
    },

    socketMessage(state, message) { //test method for returning/exposing the entire content of a message
      state.socketMessage = message
    },
  },

  actions: { // are business logic. Can commit more than one mutation at a time. Asynchronous.
    // Called when <prefix><channel> is received. Are Dispatched.
    "SOCKET_new_character"(context, payload) {
      context.commit('mutate_characterName', payload.characterName)
      context.commit('socketMessage', payload)
      console.log("newcharacter was hit", payload.characterName)
    },
    "SOCKET_existing_character"(context, payload) {
      context.commit('mutate_characterName', payload.characterName)
      context.commit('socketMessage', payload)
      console.log("existing character was hit", payload.characterName)
    },
    "setCharacterName"(context, payload) { //local usage of setting new_character mutation
      context.commit('mutate_characterName', payload)
    },
    "setMusicPlaying"(context, payload) { //local usage of setting music playing mutation
      if (payload !== false) {
        payload.then(function (response) {
          context.commit('mutate_musicPlaying', response)
        })
      } else {
        context.commit('mutate_musicPlaying', false)
      }
    },
    "setUserName"(context, payload) { //local usage of setting new_character mutation
      context.commit('mutate_username', payload)
    },
    "setloginMessage"(context, payload) { //local usage of setting loginmessge mutation
      context.commit('mutate_loginMessage', payload)
    },
    "setPassword"(context, payload) { //local usage of setting password mutation todo null this out after authenticated
      context.commit('mutate_password', payload)
    },
    "SOCKET_connect"(context) {
      context.commit('connect')
      let data = {}
      if (Vue.$cookies.isKey('user') && Vue.$cookies.isKey('auth_token')) {
        context.commit("mutate_username", Vue.$cookies.get('user'))
        data['username'] = Vue.$cookies.get('user')
        data['auth_token'] = Vue.$cookies.get('auth_token')
        if (typeof data['username'] === "string" && typeof data['auth_token'] === "string") {
          context.state.io.emit('authenticate', data)
        }
      }
    },
    "SOCKET_authenticate"(context, payload) {
      if (payload.success) {
        context.commit('auth_success', payload);
      } else {
        context.commit('auth_fail', payload.message);
      }
    },
    "SOCKET_register"(context, payload) {
      if (payload.success) {
        context.commit('auth_success', payload);
      } else {
        context.commit('auth_fail', payload.message);
      }
    },
    "SOCKET_map_update"(context, payload) {
      context.commit('mutate_map', payload.data)
    },
    "SOCKET_disconnect"(context) {
      context.commit('disconnect')
    },
  }
})

