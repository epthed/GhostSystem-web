<template>
  <div class="main">
    <div v-show="Authenticated">
      <div>
        All music is copyright Karl Casey @ White Bat Audio
      </div>
      <div>
        <p v-if="isConnected">Websocket Connected, {{loginMessage}}</p>
        <input v-model="characterName" placeholder="character name">
        <p>Message from server: "{{ socketMessage }}"</p>
        <button @click="createCharacter(characterName, username)">Create character</button>

        <button @click="playSound()">Rock Out</button>
      </div>
    </div>
    <Login v-show="!Authenticated"></Login>

  </div>
</template>


<script>
import store from '@/vuex-store'
import Game from '@/Game'
import Login from '@/components/Login'

export default {
  name: 'HelloWorld',
  data() {
    return {
    }
  },
  props: {
    msg: String,
  },
  components: {
    'Login': Login,

  },
  computed: {

    isConnected() {
      return store.getters.isConnected;
    },
    Authenticated() {
      return store.getters.Authenticated;
    },
    loginMessage: {
      get() {
        return store.getters.loginMessage;
      },
      set() {
        return "Please try to log in";
      },
    },
    characterName: {
      get() {
        return store.getters.characterName;
      },
      set(value) {
        return store.dispatch('setCharacterName', value)
      }
    },
    username: {
      get() {
        return store.getters.username;
      },
      set(value) {
        return store.dispatch('setUserName', value)
      }
    },

    socketMessage() {
      return store.getters.socketMessage;
    }

  },

  methods: {
    createCharacter: function (characterName, username) {
      // $socket is socket.io-client instance. This can emit on any channel.
      let data = {}
      data['characterName'] = characterName;
      data['username'] = username;
      this.$socket.emit('new_character', data) //unchanged for VueX
    },

    playSound: function () {
      Game.init()
      Game.play()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
