import React from 'react';
import './App.css';
import { Routes, Route, Outlet, Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
//-----------------------------------------------------------------------

// import { OrientationProvider } from './AccessOrientation';


import LevelController from './LevelController'
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

      <Routes>
        <Route path="levels" element={<LevelController />} /> 
        <Route path="*" element={<Home />} />
      </Routes>
      </div>
  );
}

function Home() {
  return (
    <div>
      <div className="grid grid-rows-3 gap-0 h-screen text-center">
        <div className='text-white pt-8 text-4xl'>All That You Hear</div>
        <div className='text-white'>v5.2</div>
        <div className='text-white font-bold'>🎧 Best experienced on headphones</div>
        <div className='text-white text-1xl'>Music & Sound Design by Biddy Connor</div>
        <div className='text-white'>Curated by Rachael Paintin</div>
        <div className='text-white'>Interactive Coding by Steph OHara</div>
        <div className='text-white'>Music Performed by</div>
        <div className='text-white pb-10'>The Letter String Quartet</div>

        <Link className="bg-gray-900 text-white font-bold py-20  border-black text-2xl" to="/levels">
            TAP TO BEGIN
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

6/1

11/1



13/1

build level 4-9
last level : playout : multiple tracks one after the other loading etc.

analytics


browser back button (https://stackoverflow.com/questions/55966533/show-alert-on-browser-back-button-event-on-react-js)

compress images!!!

single mono panning track version / 3D panner possible?

reshoot bg images

*/

