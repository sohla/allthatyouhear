import './App.css';
import { Routes, Route, Outlet, Link} from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LevelController from './LevelController';
import { BrowserView, MobileView } from 'react-device-detect';
import { createGlobalState } from 'react-use';

export type DebugModel = {
  isOn: boolean,
  ioRate: number,
  trackRate: number,
}
export const useDebugMode = createGlobalState<DebugModel>(() => ({ isOn: false, ioRate: 1, trackRate:1 }) )

//-----------------------------------------------------------------------
const RenderDebug = () => {
  const [debug, setDebug] = useDebugMode();
  
  return (
    <div>
      Debug Mode
      <label className='text-black pt-8 text-4xl'>
        <input className='w-16 h-16 m-4' type="checkbox" checked={ debug.isOn } onChange={ () => { 
          setDebug( (f) => (
            f.isOn ? {isOn: false, ioRate: 1, trackRate:1 } : {isOn: true, ioRate: 1, trackRate:1 }
            ) 
          )}}/>
      </label>
    </div>
  )
}

//-----------------------------------------------------------------------
export default function App() {
  return (
    <div className=" bg-slate-300">

      <HelmetProvider>
        <Helmet>
          <meta name="viewport" content="user-scalable=no,initial-scale=1.0,maximum-scale=1.0" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        </Helmet>
      </HelmetProvider>

      <BrowserView>
        <div className='h-screen text-center bg-neutral-900  text-slate-200 pt-8'>
        <div className='p-2 text-4xl'>All That You Hear</div>
        <div className='p-2 text-2xl'>is designed for mobile device only</div>
        </div>
      </BrowserView>
      
      <MobileView  className="bg-slate-300 h-screen">
        <Routes>
          <Route path="levels" element={<LevelController />} /> 
          <Route path="*" element={<Home />} />
        </Routes>
      </MobileView>

    </div>
  )
}
//-----------------------------------------------------------------------
function Home() {

  return (
    <div>
      <div className="grid grid-rows-3 gap-0 h-screen text-center text-4xl">
        <div className='text-black pt-8'>All That You Hear</div>
        <div className='text-black'>v6.1</div>

        <RenderDebug />
        <Link className="bg-slate-900 text-white font-bold py-20  border-black text-2xl" to="/levels">
            TAP TO BEGIN
        </Link>
      </div>

      <Outlet />
    </div>
  )
};



//-----------------------------------------------------------------------



/*

https://github.com/GoogleChrome/accessibility-developer-tools
https://github.com/paypal/AATT
browser back button (https://stackoverflow.com/questions/55966533/show-alert-on-browser-back-button-event-on-react-js)
  for f in *.jpg; do ffmpeg -i "$f" -vf scale=1200:-1 "converted/${f%%.jpg}.jpg"; done;   


info opens modal : npm i react-responsive-modal

*/

/*
Skip to Main Content
AUDIO EXPERIENCE FAQ
FAQ
This audio experience is designed to be listened to from the Nicholas Building, 

Melbourne, VIC, Australia. The Nicholas building is home to a community of over 200 artists, creatives and many independent enterprises. Many studios are private and not open to the public. We respectfully ask that you keep noise to a minimum.

What equipment do I need to access the audio experience? 

You will require a smart phone with QR-code-reader capability, mobile data and your own set of personal headphones. 

​

How do I access the audio experience?

Use your smart phone to scan the QR codes adjacent to the lifts inside the building. Not every floor will have a QR code and soundtrack associated with it.
 

Where do I begin?

The first QR code is located adjacent to the lifts on the first floor of the Nicholas Building, opposite Flinders Lane Gallery.  Look for the codes pasted up on the red tiled walls. 

​

What happens when I walk around?

The audio experience has been specially designed across more than one layer of sound. When you gently move your phone around the room(on select floors), you will hear the second soundtrack. These layers are designed to be listened to simultaneously as you walk through the building.

​

Do I have to keep moving my phone?

In short, no. As you walk through the space carrying your phone, you will notice that different soundtracks play automatically. If you want to experience more, pause and experiment with slowly moving your phone around the room as if you are standing on a pivot point.

​

How many soundtracks are there?

There are soundtracks on Level 1 - 4. This work is dynamic and ever evolving. Over the 6 months new soundtracks will be added to additional floors. 

​

What time does the building close?

The Nicholas Building is open from 8am - 5pm daily. 

​

How can I listen from home?

At this stage, the audio experience is only available in the building.

​

All That You Hear

hello@allthatyouhear.au

©2022 by All That You Hear.

​
*/