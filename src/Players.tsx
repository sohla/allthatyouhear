import { Player, Destination, now } from 'tone';
import {levelType} from './manifest';

//-----------------------------------------------------------------------
export type PlayerModel = {
  playbackRate: number,
  volume: number,
  offset: number,
  fade: number,
  loop: boolean,
}

//-----------------------------------------------------------------------
export class Players {

  tonePlayers: Map<string, Player> = new Map<string, Player>()

  //-----------------------------------------------------------------------
  loadLevelAudioFiles(level: levelType | undefined,
    onIntroLoaded: () => void,
    onTracksLoaded: () => void,
    onOutroLoaded: () => void,
    ){

    this.loadIntroAudioFiles(level, () => {
      onIntroLoaded()
      this.loadTracksAudioFiles(level, () => {
        onTracksLoaded()
        this.loadOutroAudioFiles(level, () => {
          onOutroLoaded()
        })
      })
    })
  }
  //-----------------------------------------------------------------------
  loadIntroAudioFiles(level: levelType | undefined, onLoad: () => void ){
    
    const totalCount = 2
    let count = 0

    const incCount = () => {
      count+=1
      if(count >= totalCount){
        console.log("%c level " + level?.title + " intro loaded", "color: #a4a;")
        onLoad()
      }
    }
    // intro 
    const introSoundBuffer = new Player(level?.introSound, () => {
      if(level?.introSound)
        this.tonePlayers.set(level?.introSound, introSoundBuffer)
        incCount()
    })

    const introVOBuffer = new Player(level?.introVO, () => {
      if(level?.introVO)
        this.tonePlayers.set(level?.introVO, introVOBuffer)
        incCount()
    })
  }

   //-----------------------------------------------------------------------
   loadOutroAudioFiles(level: levelType | undefined, onLoad: () => void ){

    const totalCount = 2
    let count = 0

    const incCount = () => {
      count+=1
      if(count >= totalCount){
        console.log("%c level " + level?.title + " outro loaded", "color: #a4a;")

        onLoad()
      }
    }
    // outro
    const outroSoundBuffer = new Player(level?.outroSound, () => {
      if(level?.outroSound)
        this.tonePlayers.set(level?.outroSound, outroSoundBuffer)
        incCount()
    })

    const outroVOBuffer = new Player(level?.outroVO, () => {
      if(level?.outroVO)
        this.tonePlayers.set(level?.outroVO, outroVOBuffer)
        incCount()
    })
  }

  //-----------------------------------------------------------------------
  loadTracksAudioFiles(level: levelType | undefined, onLoad: () => void ){

    const totalCount = level?.tracks.length
    if(!totalCount) return 
    let count = 0
    
    const incCount = () => {
      count+=1
      if(count >= totalCount){
        console.log("%c level " + level?.title + " tracks loaded", "color: #a4a;")
        onLoad()
      }
    }
    // tracks
    if(level?.tracks){
      level?.tracks.forEach( (track) => {
        const trackBuffer = new Player(track, () => {
          if(track)
            this.tonePlayers.set(track, trackBuffer)
            incCount()
          })
      })
    }    
  }
  
 
  //-----------------------------------------------------------------------  
  playSound(player: Player, model: PlayerModel){

    player?.set({
      playbackRate: model.playbackRate,
      volume: model.volume,
      fadeIn: model.fade,
      fadeOut: model.fade,
      loop: model.loop,
    })
    player?.connect(Destination)
    player?.start(now() + model.offset)
  }

  //-----------------------------------------------------------------------
  playIntroSound(level: levelType | undefined, model: PlayerModel){

    if(level?.introSound){
      const p = this.tonePlayers.get(level?.introSound) as Player
      this.playSound(p,model)
    }
  }

  //-----------------------------------------------------------------------
  playIntroVO(level: levelType | undefined, model: PlayerModel){

    if(level?.introSound){
      const p = this.tonePlayers.get(level?.introVO) as Player
      this.playSound(p,model)
    }
  }
  //-----------------------------------------------------------------------
  playOutroSound(level: levelType | undefined, model: PlayerModel){

    if(level?.introSound){
      const p = this.tonePlayers.get(level?.outroSound) as Player
      this.playSound(p,model)
      // TODO add delay line 
    }
  }

  //-----------------------------------------------------------------------
  playOutroVO(level: levelType | undefined, model: PlayerModel){

    if(level?.introSound){
      const p = this.tonePlayers.get(level?.outroVO) as Player
      this.playSound(p,model)
    }
  }

}