import { levelType } from './manifest';
import {Vec3} from './AccessOrientation';
import { BaseLevel } from "./BaseLevel";
import { Destination, now } from 'tone';

//-----------------------------------------------------------------------
export class Level1 extends BaseLevel{

  constructor(level: levelType | undefined){
    super()
  }

  //-----------------------------------------------------------------------
  playIntro(level: levelType | undefined, onIntroEnded: () => void){

    super.playIntro(level, onIntroEnded)

    // this.players.playIntroSound(level, {playbackRate:0.5, volume:0, offset:0, fade:0})
    this.players.playIntroVO(level, {playbackRate:1, volume:-12, offset:0, fade:0, loop: false})
  }

  //-----------------------------------------------------------------------
  playTracks(level: levelType | undefined, onTracksEnded: () => void){
  
    level && super.playTracks(level, onTracksEnded)

    level?.tracks.forEach( (track: string, i: number) => { 
      
      const player = this.players.tonePlayers.get(track) 
      if(player){

        // use helper function
        // this.players.playSound(player, {playbackRate:1, volume:0, offset:1, fade:0})
        // or fully custom playback
        player.set({
          playbackRate: 1,
          volume: 0,
          fadeIn: 0,
          fadeOut: 0,
        })
        player.connect(Destination)
        player.start(now())
      }
    })
  }  

  //-----------------------------------------------------------------------
  playOutro(level: levelType | undefined, onOutroEnded: () => void){
    
    super.playOutro(level, onOutroEnded)
    
    this.players.playOutroSound(level, {playbackRate:0.5, volume:0, offset:0, fade:0, loop: false})
    this.players.playOutroVO(level, {playbackRate:1, volume:-12, offset:2, fade:0, loop: false})
  }

  //-----------------------------------------------------------------------
  onOrientationData(level: levelType | undefined, v: Vec3){

    const t1 = level?.tracks.at(0)
    const t2 = level?.tracks.at(1)
    
    if(t1 && t2){
      const p1 = this.players.tonePlayers.get(t1) 
      const p2 = this.players.tonePlayers.get(t2) 

      if(p1&&p2){
        p1.volume.value = -( (1-v.y ) * 90) 
        p2.volume.value = -( (v.y) * 90) + 9
      }
    }

  }
}