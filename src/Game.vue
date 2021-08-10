<script>
import * as PIXI from 'pixi.js'
import {sound} from '@pixi/sound'
import store from '@/vuex-store'


PIXI.utils.skipHello()

export default {
  name: 'Game',
  computed: {

    musicPlaying: {
      get() {
        return store.getters.musicPlaying;
      },
      set(value) {
        return store.dispatch('setMusicPlaying', value)
      }
    },
  },

  init() {

    sound.add('music', require('../src/assets/Karl Casey - Dark Synthwave Collection Vol. 2 - 01 The System Has Failed.mp3'))

  },

  play() {
    //sound.context.paused = false;  Audio can't be started until user interaction, can be init with sound.add
    let musicPlaying = this.computed.musicPlaying.get();
    // if (musicPlaying !== false) {
    //   console.log(musicPlaying)
    //   let musicPlayingresult = musicPlaying.then();
    //   console.log(musicPlayingresult)
    // }
    if (musicPlaying !== false && musicPlaying._paused === false) { //todo actually fix looping
      musicPlaying.stop() //pause doesn't work
      this.computed.musicPlaying.set(false)
    } else {
      this.computed.musicPlaying.set(sound.play('music',
          {
            loop: true,
            volume: .2
          }))
    }

  }
}
</script>