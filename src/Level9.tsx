import { levelType } from './manifest';
import {Vec3} from './orientationUtils';
import { BaseLevel } from "./BaseLevel";
import {Transport } from 'tone';

//-----------------------------------------------------------------------
export class Level9 extends BaseLevel{

  constructor(level: levelType | undefined){
    super()
  }

  //-----------------------------------------------------------------------
  playIntro(level: levelType | undefined, onIntroEnded: () => void){
    super.playIntro(level, onIntroEnded)
    this.players.playIntroSound(level, {playbackRate:this.ioRate, volume:-14, offset:0, fade:0, loop: false})
    this.players.playIntroVO(level, {playbackRate:this.ioRate, volume:-14, offset:2, fade:0, loop: false})
  }

  //-----------------------------------------------------------------------
  playTracks(level: levelType | undefined, onTracksEnded: () => void){    
    const track = level?.tracks[0]
    if(track){
      const player = this.players.tonePlayers.get(track) 
      if(player){
        this.players.playSound(player, {playbackRate:this.trackRate, volume:0, offset:0, fade:0, loop: false})
  
        player.onstop = () => {
          track && this.players.tonePlayers.delete(track)
          player?.disconnect()
          player?.dispose()
    
          onTracksEnded()
  
          Transport.position = 0
          Transport.stop()
        }
      }
    }
  }  

  //-----------------------------------------------------------------------
  playOutro(level: levelType | undefined, onOutroEnded: () => void){
    const track = level?.outroVO
    if(track){
      const player = this.players.tonePlayers.get(track) 
      if(player){
        this.players.playSound(player, {playbackRate:this.ioRate, volume:0, offset:0, fade:0, loop: false})
        player.onstop = () => {
          this.playExitTrack(level,onOutroEnded)
        }
      }
    }
  }
 //-----------------------------------------------------------------------
  playExitTrack(level: levelType | undefined, onTracksEnded: () => void){
    const track = level?.tracks[1]
    if(track){
      const player = this.players.tonePlayers.get(track) 
      if(player){
        this.players.playSound(player, {playbackRate:this.ioRate, volume:0, offset:0, fade:0, loop: false})

        player.onstop = () => {
          track && this.players.tonePlayers.delete(track)
          player?.disconnect()
          player?.dispose()
    
          // onTracksEnded()

          Transport.position = 0
          Transport.stop()
        
        }
      }
    }
  }  
  //-----------------------------------------------------------------------
  onOrientationData(level: levelType | undefined, v: Vec3){

  }
}