import React, {useState, createContext, useContext, useEffect} from 'react';
import {start} from 'tone';
import {PlayIcon } from './Icons';


//-----------------------------------------------------------------------
export const WebAudioContext = createContext([{}]);

//-----------------------------------------------------------------------
export const WebAudioProvider = (props: any) => {
  const [webaudio,] = useState(false)

  useEffect( () => {
    console.log("wa:", webaudio)
    // Transport.start()
  },[webaudio])
  
  return (
    <WebAudioContext.Provider value={[webaudio]}>
        {props.children}
    </WebAudioContext.Provider>
  );
};
//-----------------------------------------------------------------------

export const GoButton = (props: {
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
const AccessWebAudio = () => {

  const [webaudio] = useContext(WebAudioContext);

  const AccessButton = async () => {
    
    if(webaudio) return
    await start()
    // setWebAudio(true)
  }
  
  return (
    <div>
      <GoButton title='Tap to begin' onButton={ () => { AccessButton()} } />
    </div>
  )
}  

export default AccessWebAudio;

