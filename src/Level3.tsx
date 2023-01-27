
import { levelType } from './manifest';
import {Vec3} from './orientationUtils';

import { BaseLevel } from "./BaseLevel";
import { Destination, now, Panner } from 'tone';


//-----------------------------------------------------------------------
export class Level3 extends BaseLevel{
  
  panners: Array<Panner> = []

  constructor(level: levelType | undefined){
    super()
  }

  //-----------------------------------------------------------------------
  playIntro(level: levelType | undefined, onIntroEnded: () => void){
    super.playIntro(level, onIntroEnded)
    this.players.playIntroSound(level, {playbackRate:1, volume:-10, offset:0, fade:0, loop: false})
    this.players.playIntroVO(level, {playbackRate:1, volume:-6, offset:2, fade:0, loop: false})
  }

  
  //-----------------------------------------------------------------------
  playTracks(level: levelType | undefined, onTracksEnded: () => void){
    super.playTracks(level, onTracksEnded)
    level?.tracks.forEach( (track: string, i: number) => { 
      const player = this.players.tonePlayers.get(track) 
      if(player){
        console.log("playing " + track)
        player.set({
          playbackRate: 10,
          volume: 0,
          fadeIn: 0,
          fadeOut: 0,
        })
        if(i === 0){
          player.connect(Destination)
        }else{
          const panner = new Panner()
          player.connect(panner)
          this.panners.push(panner)
          panner.chain(Destination)
        }
        
        player.start(now()).sync()
      }
    })
  }  
//-----------------------------------------------------------------------
playOutro(level: levelType | undefined, onOutroEnded: () => void){
    super.playOutro(level, onOutroEnded)
    this.players.playOutroSound(level, {playbackRate:1, volume:-5, offset:0, fade:2, loop: true})
    this.players.playOutroVO(level, {playbackRate:1, volume:-4, offset:0, fade:0, loop: false})
  }

  onOrientationData(level: levelType | undefined, v: Vec3){
    if(level){
      const t1 = level.tracks[0]
      const t2 = level.tracks[1]
      const t3 = level.tracks[2]

      if(t1 && t2 && t3){
        const p1 = this.players.tonePlayers.get(t1) 
        const p2 = this.players.tonePlayers.get(t2) 
        const p3 = this.players.tonePlayers.get(t3) 
        
        if(p1 && p2 && p3){

          // p1 : do nothing
          // p1.volume.value = -90
          
          // p2
          // p2.volume.value = -( (v.y) * 90)
          if(this.panners[0]){
            this.panners[0].pan.value = (v.y * 2) - 1
          }

          // p3
          // p3.volume.value = -( (1 - v.y ) * 90) 
          if(this.panners[1]){
            this.panners[1].pan.value = ((1 - v.y) * 2) - 1
          }
        }
      }
    }
  }
}
