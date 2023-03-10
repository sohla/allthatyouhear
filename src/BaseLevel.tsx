import { levelType } from './manifest';
import { Players } from './Players'
import {Vec3} from './orientationUtils';
import {Player, Transport } from 'tone';

//-----------------------------------------------------------------------
export abstract class BaseLevel {
  
  players: Players = new Players()
  trackRate = 1
  ioRate = 1
  
  //-----------------------------------------------------------------------
  load(level: levelType | undefined, 
    onIntroLoaded: () => void,
    onTracksLoaded: () => void,
    onOutroLoaded: () => void,
    
    ){
    if(level) this.players.loadLevelAudioFiles(level, 
      () => onIntroLoaded(),
      () => onTracksLoaded(),
      () => onOutroLoaded(),
    )
  }
 
  //-----------------------------------------------------------------------
  setRates(io: number, track: number){
    this.ioRate = io
    this.trackRate = track
  }
 
  //-----------------------------------------------------------------------
  playIntro(level: levelType | undefined, onIntroEnded: () => void) {
    
    console.log("%c playing intro...", "color: #4a4;")
    
    const t = level?.introVO
    if(t) {
      const player = this.players.tonePlayers.get(t) 
      if(player){
        player.onstop = () => {
          onIntroEnded()
        }
      }
    }
  }
  
  //-----------------------------------------------------------------------
  stopAllSounds() {
    
    console.log("%c stopping all sounds...", "color: #a44;");
    this.players.tonePlayers.forEach( (player: Player) => {
      player.stop()
      player.disconnect()
      player.dispose()
    })

  }
  
  //-----------------------------------------------------------------------
  stopOutroSound(level: levelType | undefined) {
    
    console.log("%c stop outro sound...", "color: #a44;");
    const t = level?.outroSound
    if(t) {
      const player = this.players.tonePlayers.get(t) 
      if(player){
        console.log("%c stop outro sound " + t + "", "color: #a44;");
        player.stop()
        player.disconnect()
        player.dispose()
      }
    }
  }
  //-----------------------------------------------------------------------
  playOutro(level: levelType | undefined, onOutroEnded: () => void) {

    console.log("%c playing outro...", "color: #4a4;");
    console.log("play out" + this.players)
    const t = level?.outroVO
    if(t) {
      const player = this.players.tonePlayers.get(t) 
      if(player){
        player.onstop = () => {
          onOutroEnded()
        }
      }
    }
  }
  
  //-----------------------------------------------------------------------
  playTracks(level: levelType | undefined, onTracksEnded: () => void) {

    console.log("%c playing tracks...", "color: #44a;")
    console.log("play tracks " + this.players)
    Transport.position = 0
    Transport.start()

    const t = level?.tracks[0]

    if(t !== undefined) {
      const player = this.players.tonePlayers.get(t) 
      if(player){
        player.onstop = () => {
          t && this.players.tonePlayers.delete(t)
          player?.disconnect()
          player?.dispose()
    
          onTracksEnded()

          Transport.position = 0
          Transport.stop()
          console.log("tracks stop" + this.players)
        }
      }
    }
  }
  
  //-----------------------------------------------------------------------
  abstract onOrientationData(level: levelType | undefined, v: Vec3): void

  //-----------------------------------------------------------------------
  playProgress(level: levelType | undefined){
  
    const track = level?.tracks[0] // use the first track
    if(track){
      const player = this.players.tonePlayers.get(track)
      const ct = player?.toSeconds(Transport.position) || 0
      const dt = player?.buffer.duration || 1
      return ( (ct * this.trackRate)  / dt) * 100
    }
    return 0
  }
  

}

