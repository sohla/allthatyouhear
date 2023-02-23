import { levelType } from './manifest';
import {Vec3} from './orientationUtils';
import { BaseLevel } from "./BaseLevel";
import {Transport } from 'tone';

//-----------------------------------------------------------------------
export class Level1 extends BaseLevel{

  constructor(level: levelType | undefined){
    super()
  }

  //-----------------------------------------------------------------------
  playIntro(level: levelType | undefined, onIntroEnded: () => void){
    this.players.playIntroVO(level, {playbackRate:this.ioRate, volume:-14, offset:0, fade:0, loop: false})
    level && super.playIntro(level, onIntroEnded)
  }

  //-----------------------------------------------------------------------
  playTracks(level: levelType | undefined, onTracksEnded: () => void){
    level?.tracks.forEach( (track) => { 
      const player = this.players.tonePlayers.get(track) 
      if(player){
        this.players.playSound(player, {playbackRate:this.trackRate, volume:-5, offset:0, fade:0, loop: false})

        player.onstop = () => {
          track && this.players.tonePlayers.delete(track)
          player?.disconnect()
          player?.dispose()
    
          onTracksEnded()

          Transport.position = 0
          Transport.stop()
        
        }
      }
    })

    // level && super.playTracks(level, onTracksEnded)
  }  

  //-----------------------------------------------------------------------
  playOutro(level: levelType | undefined, onOutroEnded: () => void){
    this.players.playOutroVO(level, {playbackRate:this.ioRate, volume:-5, offset:0, fade:0, loop: false})
    level && super.playOutro(level, onOutroEnded)
  }

  //-----------------------------------------------------------------------
  onOrientationData(level: levelType | undefined, v: Vec3){

  }
}