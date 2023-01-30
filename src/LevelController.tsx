import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { createBrowserHistory } from "history";
import { useSwipeable } from 'react-swipeable';

import { Title } from './Title';
import { InfoIcon } from './Icons';
import { PlayIcon } from './Icons';

import { manifest } from './manifest';
import { orientationToVec3 } from './orientationUtils';
import { useDeviceOrientation } from './useDeviceOrientation';

import { BaseLevel } from './BaseLevel';
import { Level1 } from './Level1';
import { Level2 } from './Level2';
import { Level3 } from './Level3';
import { Level4 } from './Level4';
import { start } from 'tone';

import PlayersProgressBar from './PlayersProgressBar';
//-----------------------------------------------------------------------
//
//-----------------------------------------------------------------------

const LevelController = () => {

  const [index, setIndex] = useState(3) 

  const [webaudio, setWebAudio] = useState(false)

  const [access, setAccess] = useState(false)
  const { orientation, requestAccess, revokeAccess, error } = useDeviceOrientation()

  const [isPlaying, setIsPlaying] = useState(false)

  const [introLoaded, setIntroLoaded] = useState(false)
  const [tracksLoaded, setTracksLoaded] = useState(false)
  const [, setOutroLoaded] = useState(false)

  const [outroPlaying, setOutroPlaying] = useState(false)

  const levels = useRef( new Map<string, BaseLevel>() )

  const bg_class = introLoaded ? "100%" : "0%" 

  const history = createBrowserHistory()

  //-----------------------------------------------------------------------
  const getLevelTitle = (index: number) => {
    const levels = ['level1','level2','level3','level4']
    return levels[index]
  }
  
  //-----------------------------------------------------------------------
  useEffect( () => {
    levels.current.set('level1', new Level1(manifest.get('level1')))
    levels.current.set('level2', new Level2(manifest.get('level2')))
    levels.current.set('level3', new Level3(manifest.get('level3')))
    levels.current.set('level4', new Level4(manifest.get('level4')))

    // console.log("-->",manifest.get('level1')?.title)

    // !!!! DD BACK FOR LEVEL 1
    // levels.current.get('level1')?.load(manifest.get('level1'), 
    //   () => { setIntroLoaded(true) },
    //   () => { setTracksLoaded(true) },
    //   () => { setOutroLoaded(true) },
    // )
  },[])
  //-----------------------------------------------------------------------
  useEffect( () => {
    let unlisten = history.listen(({ action, location }) => {
      if(action === "POP"){
        unlisten()
        const title = getLevelTitle(index)
        levels.current.get(title)?.stopAllSounds()
      }
    })

    return () => {
    }
    // really bad! ignore history
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

      levels.current.get(title)?.playTracks(level, () => {

        setOutroPlaying(true)
        
        levels.current.get(title)?.playOutro(level, () => {
          // leave for now! 
          setTracksLoaded(false)
          setOutroLoaded(false)

          setTimeout(function() {
            setIntroLoaded(false) // triggers fade

            setTimeout(function() { // delay after fade has finished
              setIsPlaying(false)
              setOutroPlaying(false)
              setIndex((f) => f + 1)
            }, 1000)

          }, 3000)
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
      <div className="p-6 text-black font-bold text-2xl w-full self-center text-center">
        {text}
      </div>
    )
  }

  //-----------------------------------------------------------------------
  const RenderOutro = () => {
    const title = getLevelTitle(index)
    const text = manifest.get(title)?.outroText
  
    return ( 
      <div className="p-6 fixed bottom-44 text-black font-bold text-2xl w-full self-center text-center">
        {text}
      </div>
    )
  }
  //-----------------------------------------------------------------------
  const RenderPlaying = () => {
    return (
      <div className="bg-black bg-opacity-0 text-black font-bold w-full self-center text-2xl text-center">
        { !outroPlaying && (index > 0) ? <div className="h-48 opacity-70 bg-[url('../public/img/MovingPhone_SlowBlack.gif')] bg-contain bg-center bg-no-repeat"></div> : <div></div>}
        { outroPlaying ? <RenderOutro /> : <RenderTracks /> }
      </div>
    )
  }

  //-----------------------------------------------------------------------
  const GoButton = (props: {
    title: string,
    onButton: () => void
  }) => {

    const handlers = useSwipeable({
      onTouchStartOrOnMouseDown: () => {props.onButton()},
      // onTouchEndOrOnMouseUp: () => {props.onButton()},
      touchEventOptions: {passive: false},

    })

    return (
      <div className="fixed  text-black bottom-32 font-bold w-full self-center text-2xl text-center">
        <div className=" flex justify-center items-center " {...handlers}>
          <PlayIcon color="black"/>
        </div> 
        <div className="py-6 opacity-80">{props.title}</div>
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
        {
          introLoaded ? <GoButton title='Tap to begin' onButton={ () => { 
            setAccess(true) //MUST call this from here. sigh!
            AccessButton()
          }} />
          :
          <RenderLoading />
      }
    </div>
     
    )
  }
  //-----------------------------------------------------------------------
  const RenderContinue = () => {

    const title = getLevelTitle(index - 1)
    
    return(
      <div>
        {
          introLoaded ? <GoButton title='Tap to begin this level' onButton={ () => {
        
          setAccess(true) //MUST call this from here. sigh!
          setIsPlaying( (f) => !f)
          
          if(index > 0) {
            levels.current.get(title)?.stopOutroSound(manifest.get(title))
          }
        } }/>
        :<RenderLoading />
      }
      </div>
    )
  }
  //-----------------------------------------------------------------------
  const RenderLoading = () => {
    return (
      <div>
        <div className="w-full text-center text-black mt-40 text-2xl font-bold opacity-50">loading...</div>
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
        { isPlaying ? <RenderPlaying /> : <RenderContinue /> }
      </div>
    )
  }
  
  //-----------------------------------------------------------------------
  const RenderNextButton = () => {

    const onFunc = () => {
      const title = getLevelTitle(index)
      levels.current.get(title)?.stopAllSounds()

      setIsPlaying(false)
      setIntroLoaded(false)
      setTracksLoaded(false)
      setOutroLoaded(false)
      setTimeout(function() {
        setIndex((f) => f + 1)
      }, 1000)
    }

    const handlers = useSwipeable({
      onTouchStartOrOnMouseDown: () => {onFunc()},
      touchEventOptions: {passive: false},
    })

    return(
      <div>
        {/* <button className=" bg-gray-200 p-9 fixed bottom-0 w-full opacity-40" onClick={ () => { onFunc()} }>
          <div>SKIP TO NEXT LEVEL</div>
        </button> */}

        <div className=" bg-gray-200 p-9 fixed bottom-0 w-full opacity-40  text-center" {...handlers}>
          <div>SKIP TO NEXT LEVEL</div>
        </div>

      </div>
      )
    }
  //-----------------------------------------------------------------------
  const title = getLevelTitle(index)
  const u = outroPlaying ? "url("+manifest.get(title)?.outroImg+")" :  "url("+manifest.get(title)?.backgroundImg+")"

  return (
    <div className="h-screen bg-red" >
      <div className="bg-cover bg-center fixed top-0 w-full h-screen justify-center transition-opacity duration-1000 ease-out opacity-0" style={{ backgroundImage: u, opacity:bg_class}}>
        
        { !outroPlaying && <Title floor={String(manifest.get(title)?.floor)} title={String(manifest.get(title)?.title)}/> }
        
        { webaudio ? <RenderWebAudio /> : <RenderNoWebAudio /> }
        
        { tracksLoaded && <RenderNextButton /> }

        <PlayersProgressBar ready={isPlaying} level={manifest.get(title)} baseLevel={levels.current.get(title)!} />
        
        <InfoIcon color={"black"}/> 
        
     </div>
    </div>
  )
  
}
export default LevelController;
