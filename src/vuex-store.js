import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnected: false,
    socketMessage: '',
    characterName: '',
    userName: '',
    map: {},
    musicPlaying: false,
  },


  getters: {
    isConnected: state => {
      return state.isConnected
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

    mutate_characterName(state, message) {
      state.characterName = message
    },
    mutate_musicPlaying(state, message) {
      state.musicPlaying = message
    },
    mutate_userName(state, message) {
      state.userName = message
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
      }
      else {
        context.commit('mutate_musicPlaying', false)
      }
    },
    "setUserName"(context, payload) { //local usage of setting new_character mutation
      context.commit('mutate_userName', payload)
    },
    "SOCKET_connect"(context) {
      context.commit('connect')
    },
    "SOCKET_map_update"(context, payload) {
      context.commit('mutate_map', payload.data)
    },
    "SOCKET_disconnect"(context) {
      context.commit('disconnect')
    },
  }
})

