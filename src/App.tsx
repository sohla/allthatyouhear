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


https://atyh.s3.ap-southeast-2.amazonaws.com/Acknowledgement+of+Country+2023_MakeYourWayLevel2.mp3

level1:
swap order : 

*/
