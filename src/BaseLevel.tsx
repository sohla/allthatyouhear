import { levelType } from './manifest';
import { Players } from './Players'
import {Vec3} from './orientationUtils';
import {Player, Transport } from 'tone';

//-----------------------------------------------------------------------
export abstract class BaseLevel {
  
  players = new Players()
  trackRate = 20
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
        player.stop()
        player.disconnect()
        player.dispose()
      }
    }
  }
  //-----------------------------------------------------------------------
  playOutro(level: levelType | undefined, onOutroEnded: () => void) {

    console.log("%c playing outro...", "color: #4a4;");
    
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
      return (ct / dt) * 100
    }
    return 0
  }
  

}

