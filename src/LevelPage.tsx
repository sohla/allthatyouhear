import React, {useEffect, useRef, useMemo, useState} from 'react';
import './App.css';
import { Title } from './Title';
import { InfoIcon } from './Icons';
import {PlayIcon } from './Icons';
import {manifest} from './manifest';
// import {GoButton} from './AccessWebAudio';
import {orientationToVec3} from './AccessOrientation';
import {useDeviceOrientation} from './useDeviceOrientation';

import { BaseLevel } from './BaseLevel';
import { Level1 } from './Level1';
import { Level2 } from './Level2';
import {start} from 'tone';

// import PlayersProgressBar from './PlayersProgressBar';
//-----------------------------------------------------------------------
//
//-----------------------------------------------------------------------

const LevelPage = ( props:{
    levelID: string
  }) => {

  // const [webaudio,] = useContext(WebAudioContext);
  const [webaudio, setWebAudio] = useState(false)

  const [access, setAccess] = useState(false)
  const { orientation, requestAccess, revokeAccess } = useDeviceOrientation()
  // const orientData = useRef(orientationToVec3(orientation!, 1))

  // const [ access ,setAccess, orientData] = useContext(OrientationContext);
  const [isPlaying, setIsPlaying] = useState(false)

  const [introLoaded, setIntroLoaded] = useState(false)
  const [tracksLoaded, setTracksLoaded] = useState(false)
  const [outroLoaded, setOutroLoaded] = useState(false)

  const [outroPlaying, setOutroPlaying] = useState(false)

  const levels = useRef( new Map<string, BaseLevel>() )
  const levelNames = useMemo( () => {
    return ['level1','level2','level3','level4']
  },[])


  const [index, setIndex] = useState(0) 
  // const [title, setTitle] = useState('level1')
    
  const bg_class = introLoaded ? "100%" : "0%" 

  //-----------------------------------------------------------------------
  useEffect( () => {

    levels.current.set('level1', new Level1(manifest.get('level1')))
    levels.current.set('level2', new Level2(manifest.get('level2')))
    levels.current.set('level3', new Level2(manifest.get('level3')))
    levels.current.set('level4', new Level2(manifest.get('level4')))

    console.log("-->",manifest.get('level1')?.title)

    // !!!! DD BACK FOR LEVEL 1
    // levels.current.get('level1')?.load(manifest.get('level1'), 
    //   () => { setIntroLoaded(true) },
    //   () => { setTracksLoaded(true) },
    //   () => { setOutroLoaded(true) },
    // )

  },[])
  

    //-----------------------------------------------------------------------
    useEffect( () => {
      if(!webaudio) return
      setIsPlaying(true)
    },[webaudio])

    //-----------------------------------------------------------------------
    useEffect( () => {

      if(!isPlaying) return
      if(!introLoaded) return
      const title = levelNames.at(index)!
      const level = manifest.get(title)

      levels.current.get(title)?.playIntro(level, () => {

        console.log("intro ended")

        levels.current.get(title)?.playTracks(level, () => {

          console.log("-> tracks ended")

          setOutroPlaying(true)
          
          levels.current.get(title)?.playOutro(level, () => {

            console.log("-> outro ended")

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

    },[isPlaying, index, levelNames, introLoaded])
    
    //-----------------------------------------------------------------------
    useEffect( () => {
      if(!introLoaded) return
      console.log("-> intro loaded")
    },[introLoaded])

    //-----------------------------------------------------------------------
    useEffect( () => {
      if(!tracksLoaded) return
      console.log("-> tracks loaded")
    },[tracksLoaded])

    //-----------------------------------------------------------------------
    useEffect( () => {
      if(!outroLoaded) return
      console.log("-> outro loaded")
    },[outroLoaded])
        
    //-----------------------------------------------------------------------
    useEffect( () => {
      if(index === 0) return // don't force load level 1

      const title = levelNames.at(index) as string

      console.log(index)
      levels.current.get(title)?.load(manifest.get(title), 
        () => {setIntroLoaded(true)},
        () => {setTracksLoaded(true)},
        () => {setOutroLoaded(true)},
      )
    },[index, levelNames])
 
  //-----------------------------------------------------------------------
  useEffect( () => {
    if(webaudio) {
      setAccess(true)
    }
  },[webaudio, setAccess])

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

    if(!access) return
    let v = orientationToVec3(orientation!, 1)
    const title = levelNames.at(index) as string
    levels.current.get(title)?.onOrientationData(manifest.get(title), v)

  },[access, orientation, index, levelNames])

  //-----------------------------------------------------------------------
  const RenderTracks = () => {

    const title = levelNames.at(index) as string
    const text = manifest.get(title)?.tracksText

    return ( 
      <div className="bg-pink-400 p-6 text-black font-bold text-2xl w-full self-center text-center">
        {text}
      </div>
    )
  }

  //-----------------------------------------------------------------------
  const RenderOutro = () => {

    const title = levelNames.at(index) as string
    const text = manifest.get(title)?.outroText
  
    return ( 
      <div className="bg-pink-400 p-6 text-black font-bold text-2xl w-full self-center text-center">
        {text}
      </div>
    )
  }
  //-----------------------------------------------------------------------
  const RenderPlaying = () => {
    return (
      <div className="bg-black bg-opacity-0 text-black font-bold w-full self-center text-2xl text-center">
        {/* <div className="bg-yellow-500  h-60 opacity-50 bg-[url('../public/img/MovingPhone_SlowBlack.gif')] bg-contain bg-center bg-no-repeat"></div> */}
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
      <div className=" text-black font-bold w-full self-center p-12 text-2xl text-center">
        <button onClick={ () => props.onButton() }>
          <PlayIcon color="black"/>
        </button>
        <div>{props.title}</div>
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
      <GoButton title='Tap to begin' onButton={ () => { AccessButton()} } />
    </div>
     
    )
  }
  //-----------------------------------------------------------------------
  const RenderNext = () => {
  return(
    <div>
      <GoButton title='Tap to continue' onButton={ () => {
      
        setIsPlaying( (f) => !f)
        
        if(index > 0) {
          const title = levelNames.at(index - 1) as string
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
        <div className="w-full text-center text-black mt-40 text-2xl">loading...</div>
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
  // const title = levelNames.at(index) as string
  // const u = outroPlaying ? "url("+manifest.get(title)?.outroImg+")" :  "url("+manifest.get(title)?.backgroundImg+")"

  return (
    <div className="h-screen bg-red" >
      {/* <div className="bg-cover bg-center fixed top-0 right-0 flex flex-col h-screen justify-center transition-opacity duration-1000 ease-out" style={{ backgroundImage: u, opacity:bg_class}}></div> */}
      {/* <div className="bg-cover bg-center fixed top-0 w-full h-screen justify-center transition-opacity duration-1000 ease-out opacity-0" style={{ backgroundImage: u, opacity:bg_class}}> */}
        
        {/* <Title floor={String(manifest.get(title)?.floor)} title={String(manifest.get(title)?.title)}/> */}
        
        { webaudio ? <RenderWebAudio /> : <RenderNoWebAudio /> }
        
        <RenderNextButton />

        {/* <PlayersProgressBar ready={isPlaying} level={manifest.get(title)} baseLevel={levels.current.get(title)!} /> */}

        
        <InfoIcon color={"black"}/> 
        
     {/* </div> */}


    
    </div>
  )
  
}
export default LevelPage;
