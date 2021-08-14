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
    userName: '',
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
    userName: state => {
      return state.userName
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
    mutate_userName(state, message) {
      state.userName = message
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
      // do something
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
      context.commit('mutate_userName', payload)
    },
    "setPassword"(context, payload) { //local usage of setting password mutation todo null this out after authenticated
      context.commit('mutate_password', payload)
    },
    "SOCKET_connect"(context) {
      context.commit('connect')
      let data = {}
      if (Vue.$cookies.isKey('user')) {
        data['username'] = Vue.$cookies.get('user')
        data['auth_token'] = Vue.$cookies.get('auth_token')
        context.state.io.emit('authenticate', data)
      }
    },
    "SOCKET_authenticate"(context, payload) {
      if (payload.success) {
        context.commit('auth_success', payload);
      } else {
        context.commit('auth_fail', payload.message);
      }
    },
    "SOCKET_register"(context, payload){
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

