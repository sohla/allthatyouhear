import React from 'react';
import './App.css';
import { Routes, Route, Outlet, Link} from "react-router-dom";
import {Helmet} from "react-helmet";
//-----------------------------------------------------------------------

// import { OrientationProvider } from './AccessOrientation';


import LevelPage from './LevelPage'
// import MissingPersons from './MissingPersons'

//-----------------------------------------------------------------------

export default function App() {
  return (
    <div className="bg-emerald-800">
      <Helmet>
        <meta name="viewport" content="user-scalable=no,initial-scale=1.0,maximum-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Helmet>

      {/* <OrientationProvider> */}
          <Routes>
            <Route path="levelPage1" element={<LevelPage levelID='level1'/>} /> 

            <Route path="*" element={<Home />} />
          </Routes>
      {/* </OrientationProvider> */}
      </div>
  );
}

function Home() {
  return (
    <div>
      <div className="grid grid-rows-3 gap-0 h-screen text-center">
      <div className='text-white pt-20 text-4xl'>All That You Hear</div>
      <div className='text-white'>v5.0</div>
      <div className='text-white'>🎧 Best experienced on headphones</div>
      <div className='text-white'>Music & Sound Design by Biddy Connor</div>
      <div className='text-white'>Interactive Coding by Steph OHara</div>
      <div className='text-white'>Music Performed by The Letter String Quartet</div>

      <p>
        Select a Level :
      </p>
      <Link className="bg-gray-900 text-white font-bold py-20 border-b-4 border-black text-4xl" to="/levelPage1">
          GO
        </Link>
 
      </div>

      <Outlet />
    </div>
  );
}



//-----------------------------------------------------------------------



/*
  Meeting 15th

  Finishing - Shorter Version

  Stairs journey has a track

  Build UX/UI 
    Please make your way to Level 2
    Press play when you have arrived to Level 2

  Google analytics

  
  28th Nov. deploy


  internals :

    refactor : names etc. add each state

    refactor : config file for floors : remove duplication and only have the audio mixing/orientation code for each

    stop intro when track is loaded and playing with long fadeOut

    buffer system : trigger buffer loads and access to buffers
    

  level 2:
  break up onDismount
  
Use composition :


loader : props.url 


Players:

introVO 
introSound

players

outroVO
ontroSound

https://github.com/GoogleChrome/accessibility-developer-tools
https://github.com/paypal/AATT


8/12
break out level ui fro each level :
start building out each level

6/1
level 1 acknowledge 
single mono voice track panning / 3D panner possible?
last level : playout : multiple tracks one after the other loading etc.

11/1
change to main bracn (need to solve jsx config bug)


*/