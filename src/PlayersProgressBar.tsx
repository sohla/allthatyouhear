import React, {useState} from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { useInterval } from './timerUtils'
import { BaseLevel } from "./BaseLevel";
import { levelType } from './manifest';

const PlayersProgressBar = (props: { ready: Boolean, level: levelType | undefined, baseLevel: BaseLevel}) => {
  
const [position, setPosition] = useState(0) 
  useInterval(() => {

    if(props.ready){
        setPosition(props.baseLevel.playProgress(props.level))
    }
  }, 50)
  return (
    <div>
      <ProgressBar completed={position} customLabel=' ' transitionDuration='0.4' height={"4px"} width={"100%"} bgColor='white' baseBgColor='black' borderRadius="0" className="w-full fixed bottom-0"/>
    </div>
  )
}

export default PlayersProgressBar;