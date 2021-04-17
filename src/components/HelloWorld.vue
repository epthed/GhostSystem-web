<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.

      Hello World.
    </p>
    <div>
      All music is copyright Karl Casey @ White Bat Audio
    </div>
    <div>
      <p v-if="isConnected">We're connected to the server!</p>
      <input v-model="characterName">
      <p>Message from server: "{{ socketMessage }}"</p>
      <button @click="createCharacter(characterName)">Create character</button>

      <button @click="playSound()">Rock Out</button>
    </div>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank"
             rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank"
             rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a>
      </li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>


<script>
import store from '@/vuex-store'
import {Game} from '@/Game'

export default {
  name: 'HelloWorld',
  props: {
    msg: String,

  },
  computed: {

    isConnected() {
      return store.getters.isConnected;
    },
    characterName: {
      get() {
        return store.getters.characterName;
      },
      set(value) {
        return store.dispatch('setCharacterName', value)
      }

    },
    socketMessage() {
      return store.getters.socketMessage;
    }

  },

  methods: {
    createCharacter: function (data) {
      // $socket is socket.io-client instance. This can emit on any channel.
      this.$socket.emit('new_character', data) //unchanged for VueX
    },
    playSound: function() {
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
