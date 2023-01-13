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

    // this.players.playIntroSound(level, {playbackRate:0.5, volume:0, offset:0, fade:0})
    this.players.playIntroVO(level, {playbackRate:1, volume:-5, offset:0, fade:0, loop: false})

    level && super.playIntro(level, onIntroEnded)
  }

  //-----------------------------------------------------------------------
  playTracks(level: levelType | undefined, onTracksEnded: () => void){
  

    level?.tracks.forEach( (track) => { 
      const player = this.players.tonePlayers.get(track) 
      if(player){
        this.players.playSound(player, {playbackRate:20, volume:-5, offset:0, fade:0, loop: false})

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
    
    
    // this.players.playOutroSound(level, {playbackRate:0.5, volume:0, offset:0, fade:0})
    this.players.playOutroVO(level, {playbackRate:20, volume:-5, offset:0, fade:0, loop: false})
    level && super.playOutro(level, onOutroEnded)
  }

  //-----------------------------------------------------------------------
  onOrientationData(level: levelType | undefined, v: Vec3){

  }
}