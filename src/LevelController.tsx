import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import { createBrowserHistory } from "history";

import { Title } from './Title';
import { InfoIcon } from './Icons';
import {PlayIcon } from './Icons';
import {manifest} from './manifest';
import {orientationToVec3} from './orientationUtils';
import {useDeviceOrientation} from './useDeviceOrientation';

import { BaseLevel } from './BaseLevel';
import { Level1 } from './Level1';
import { Level2 } from './Level2';
import {start} from 'tone';

import PlayersProgressBar from './PlayersProgressBar';
//-----------------------------------------------------------------------
//
//-----------------------------------------------------------------------

const LevelController = () => {

  const [webaudio, setWebAudio] = useState(false)

  const [access, setAccess] = useState(false)
  const { orientation, requestAccess, revokeAccess, error } = useDeviceOrientation()

  const [isPlaying, setIsPlaying] = useState(false)

  const [introLoaded, setIntroLoaded] = useState(false)
  const [, setTracksLoaded] = useState(false)
  const [, setOutroLoaded] = useState(false)

  const [outroPlaying, setOutroPlaying] = useState(false)

  const levels = useRef( new Map<string, BaseLevel>() )

  const [index, setIndex] = useState(0) 
    
  const bg_class = introLoaded ? "100%" : "0%" 
  let history = createBrowserHistory()

  //-----------------------------------------------------------------------
  const getLevelTitle = (index: number) => {
    const levels = ['level1','level2','level3','level4']
    return levels[index]
  }
  
  //-----------------------------------------------------------------------
  useEffect( () => {

    // levelNames.current = ['level1','level2','level3','level4']

    levels.current.set('level1', new Level1(manifest.get('level1')))
    levels.current.set('level2', new Level2(manifest.get('level2')))
    levels.current.set('level3', new Level2(manifest.get('level3')))
    levels.current.set('level4', new Level2(manifest.get('level4')))

    // console.log("-->",manifest.get('level1')?.title)

    // !!!! DD BACK FOR LEVEL 1
    levels.current.get('level1')?.load(manifest.get('level1'), 
      () => { setIntroLoaded(true) },
      () => { setTracksLoaded(true) },
      () => { setOutroLoaded(true) },
    )
 

  },[])
  //-----------------------------------------------------------------------
  useEffect( () => {
    let unlisten = history.listen(({ action, location }) => {
      // The current location changed.
      if(action === "POP"){
        unlisten()
        const title = getLevelTitle(index)
        console.log(action, title)
        levels.current.get(title)?.stopAllSounds()

      }
    })

    return () => {
    }
    // really bad!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  


  //-----------------------------------------------------------------------
  useEffect( () => {
    if(!webaudio) return
    setIsPlaying(true)
  },[webaudio])

  //-----------------------------------------------------------------------
  useEffect( () => {

    if(!isPlaying) return
    if(!introLoaded) return

    const title = getLevelTitle(index)
    const level = manifest.get(title)

    levels.current.get(title)?.playIntro(level, () => {

      // console.log("intro ended")

      levels.current.get(title)?.playTracks(level, () => {

        // console.log("-> tracks ended")

        setOutroPlaying(true)
        
        levels.current.get(title)?.playOutro(level, () => {

          // console.log("-> outro ended")

          // leave for now! 
          setIntroLoaded(false)
          setTracksLoaded(false)
          setOutroLoaded(false)
          setTimeout(function() {
            setIsPlaying(false)
            setOutroPlaying(false)
            setIndex((f) => f + 1)
          }, 1000)
        })  
      })
    })

  },[isPlaying, index, introLoaded])
  
  //-----------------------------------------------------------------------
  useEffect( () => {
    if(index === 0) return // don't force load level 1

    const title = getLevelTitle(index)

    levels.current.get(title)?.load(manifest.get(title), 
      () => {setIntroLoaded(true)},
      () => {setTracksLoaded(true)},
      () => {setOutroLoaded(true)},
    )
  },[index])

  //-----------------------------------------------------------------------
  useEffect( () => {
    
    if(access){
      requestAccess()
    }else{
      revokeAccess()
    }
  },[access, requestAccess, revokeAccess])

  //-----------------------------------------------------------------------
  useEffect( () => {
    if(!error) return
    console.log("access err:",error?.message)
  },[error])
  
  //-----------------------------------------------------------------------
  useEffect( () => {

    if(!access) return
    let v = orientationToVec3(orientation!, 1)
    const title = getLevelTitle(index)

    levels.current.get(title)?.onOrientationData(manifest.get(title), v)

  },[access, orientation, index])

  //-----------------------------------------------------------------------
  const RenderTracks = () => {

    const title = getLevelTitle(index)
    const text = manifest.get(title)?.tracksText

    return ( 
      <div className="bg-pink-400 bg-opacity-50 p-6 text-black font-bold text-2xl w-full self-center text-center">
        {text}
      </div>
    )
  }

  //-----------------------------------------------------------------------
  const RenderOutro = () => {

    const title = getLevelTitle(index)
    const text = manifest.get(title)?.outroText
  
    return ( 
      <div className="bg-pink-400 bg-opacity-60 p-6 text-black font-bold text-2xl w-full self-center text-center">
        {text}
      </div>
    )
  }
  //-----------------------------------------------------------------------
  const RenderPlaying = () => {
    return (
      <div className="bg-black bg-opacity-0 text-black font-bold w-full self-center text-2xl text-center">
        {(index > 0) ? <div className="bg-yellow-500  h-48 opacity-50 bg-[url('../public/img/MovingPhone_SlowBlack.gif')] bg-contain bg-center bg-no-repeat"></div> : <div></div>}
        { outroPlaying ? <RenderOutro /> : <RenderTracks /> }
      </div>
    )
  }

  //-----------------------------------------------------------------------
  const GoButton = (props: {
    title: string,
    onButton: () => void
  }) => {
  
    return (
      <div className="fixed  text-black bottom-32 font-bold w-full self-center text-2xl text-center">
        {/* <div className=" flex justify-center items-center "
            // onMouseDown={e => { console.log("mouse down") }}
            onTouchEnd={ () => props.onButton() }
        >
          <PlayIcon color="black"/>
        </div> */}

        <button className="" onClick={ () => props.onButton() }>
          <PlayIcon color="black"/>
        </button>

        <div className="py-6">{props.title}</div>
      </div>
    )
  }
  //-----------------------------------------------------------------------
  const RenderWebAudioButton = () => {
    
    const AccessButton = async () => {
    
      if(webaudio) return
      await start()
      setWebAudio(true)
    }
    
    return (
      <div>
        <GoButton title='Tap to begin' onButton={ () => { 
            setAccess(true) //MUST call this from here. sigh!
            AccessButton()
        }
      } />
    </div>
     
    )
  }
  //-----------------------------------------------------------------------
  const RenderNext = () => {
  return(
    <div>
      <GoButton title='Tap to continue' onButton={ () => {
      
        setAccess(true) //MUST call this from here. sigh!
        setIsPlaying( (f) => !f)
        
        if(index > 0) {

          const title = getLevelTitle(index - 1)
          levels.current.get(title)?.stopOutroSound(manifest.get(title))
        }
      } }/>
    </div>
    )
  }
  //-----------------------------------------------------------------------
  const RenderLoading = () => {
    return (
      <div>
        <div className="w-full text-center text-black mt-40 text-2xl font-bold">loading...</div>
      </div>
    )
  }
  
  //-----------------------------------------------------------------------
  const RenderNoWebAudio = () => {
    return(
      <div>
        { introLoaded ? <RenderWebAudioButton /> : <RenderLoading /> }
      </div>
      )
    }

  //-----------------------------------------------------------------------
  const RenderWebAudio = () => {
    return(
      <div>
        { isPlaying ? <RenderPlaying /> : <RenderNext /> }
      </div>
      )
    }
  
  //-----------------------------------------------------------------------
  const RenderNextButton = () => {
    return(
      <div>
        <button className=" bg-gray-200 p-9 fixed bottom-0 w-full opacity-40" onClick={ () => {

          const title = getLevelTitle(index)
          levels.current.get(title)?.stopAllSounds()

          setIsPlaying(false)
          setIntroLoaded(false)
          setTracksLoaded(false)
          setOutroLoaded(false)
          setTimeout(function() {
            setIndex((f) => f + 1)
          }, 1000)

        } }>
          <div>SKIP TO NEXT LEVEL</div>
        </button>
      </div>
      )
    }
  //-----------------------------------------------------------------------
  const title = getLevelTitle(index)
  const u = outroPlaying ? "url("+manifest.get(title)?.outroImg+")" :  "url("+manifest.get(title)?.backgroundImg+")"

  return (
    <div className="h-screen bg-red" >
      {/* <div className="bg-cover bg-center fixed top-0 right-0 flex flex-col h-screen justify-center transition-opacity duration-1000 ease-out" style={{ backgroundImage: u, opacity:bg_class}}></div> */}
      <div className="bg-cover bg-center fixed top-0 w-full h-screen justify-center transition-opacity duration-1000 ease-out opacity-0" style={{ backgroundImage: u, opacity:bg_class}}>
        
        <Title floor={String(manifest.get(title)?.floor)} title={String(manifest.get(title)?.title)}/>
        
        { webaudio ? <RenderWebAudio /> : <RenderNoWebAudio /> }
        
        <RenderNextButton />

        <PlayersProgressBar ready={isPlaying} level={manifest.get(title)} baseLevel={levels.current.get(title)!} />

        
        <InfoIcon color={"black"}/> 
        
     </div>


    
    </div>
  )
  
}
export default LevelController;
