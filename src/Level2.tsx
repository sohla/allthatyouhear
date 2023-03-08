
import { levelType } from './manifest';
import {Vec3} from './orientationUtils';
import { BaseLevel } from "./BaseLevel";
import { Destination, now } from 'tone';


//-----------------------------------------------------------------------
export class Level2 extends BaseLevel{
  
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
    super.playTracks(level, onTracksEnded)
    level?.tracks.forEach( (track: string, i: number) => { 
      const player = this.players.tonePlayers.get(track) 
      if(player){
        // use helper function
        // this.players.playSound(player, {playbackRate:1, volume:0, offset:1, fade:0})
        // or fully custom playback
        player.set({
          playbackRate: this.trackRate,
          volume: 0,
          fadeIn: 0,
          fadeOut: 0,
        })
        player.connect(Destination)
        player.start(now()).sync()
      }
    })
  }  
//-----------------------------------------------------------------------
playOutro(level: levelType | undefined, onOutroEnded: () => void){
    super.playOutro(level, onOutroEnded)
    this.players.playOutroSound(level, {playbackRate:this.ioRate, volume:-5, offset:0, fade:2, loop: true})
    this.players.playOutroVO(level, {playbackRate:this.ioRate, volume:-4, offset:0, fade:0, loop: false})
  }

  onOrientationData(level: levelType | undefined, v: Vec3){
    if(level){
      const t1 = level.tracks[0]
      const t2 = level.tracks[1]

      if(t1 && t2){
        const p1 = this.players.tonePlayers.get(t1) 
        const p2 = this.players.tonePlayers.get(t2) 
        
        if(p1&&p2){
          p1.volume.value = -( (1-v.y ) * (1-v.y ) * 220) 
          p2.volume.value = -( (v.y) * (v.y) * 220) + 9
        }
      }
    }
  }
}