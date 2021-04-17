import * as PIXI from 'pixi.js'
import {sound} from '@pixi/sound'



PIXI.utils.skipHello()

export let Game = {
    musicPlaying: null,

    init(){

        sound.add('music', require('../src/assets/Karl Casey - Dark Synthwave Collection Vol. 2 - 01 The System Has Failed.mp3'))

    },

    play(){
        //sound.context.paused = false;  Audio can't be started until user interaction, can be init with sound.add
        if (this.musicPlaying != null && this.musicPlaying.isPlaying){ //todo actually fix looping
            this.musicPlaying.stop()
        }
        else {
        this.musicPlaying = sound.play('music',
            {loop: true,
                    volume: .2})}

    }
}