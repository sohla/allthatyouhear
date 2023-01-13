import { useCallback, useEffect, useState } from 'react';


// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value; //assign the value of ref to the argument
//   },[value]); //this code will run when the value of 'value' changes
//   return ref.current; //in the end, return the current ref value.
// }
// export default usePrevious;
interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

export type DeviceOrientation = {
  alpha: number | null
  beta: number,
  gamma: number,
}

type UseDeviceOrientationData = {
  orientation: DeviceOrientation | null,
  error: Error | null,
  requestAccess: () => Promise<boolean>,
  revokeAccess: () => Promise<void>,
};

export const useDeviceOrientation = (): UseDeviceOrientationData => {
  const [error, setError] = useState<Error | null>(null);
  const [orientation, setOrientation] = useState<DeviceOrientation | null>(null);

  // const orientation = useRef<DeviceOrientation | null>(null);
  
  // const prevOrientation = usePrevious(orientation)

  const onDeviceOrientation = (event: DeviceOrientationEvent): void => {

    // const a = event.alpha > 180 ? event.alpha - 360 : event.alpha;
    // const b = event.beta - 90;
    // const g = event.gamma > 180 ? 360 - event.gamma : -event.gamma;
    if(event.alpha && event.beta && event.gamma){
      setOrientation({
        alpha: event.alpha,
        beta: event.beta + 180,
        gamma: event.gamma + 90,
      })
    }
    // orientation.current = {
    //   alpha: a,
    //   beta: b,
    //   gamma: g,
    // };
  };

  const revokeAccessAsync = async (): Promise<void> => {
    window.removeEventListener('deviceorientation', onDeviceOrientation);
    setOrientation(null)
  };

  const requestAccessAsync = async (): Promise<boolean> => {
    if (!DeviceOrientationEvent) {
      setError(new Error('Device orientation event is not supported by your browser'));
      return false;
    }
    console.log("xxx")
    if (
      (DeviceMotionEvent as any).requestPermission
      && typeof (DeviceMotionEvent as any).requestPermission === 'function'
    ) {
      let permission: PermissionState;
      console.log("calling requestPermission")
      try {
        permission = await (DeviceMotionEvent as any).requestPermission();
        console.log(permission)
      } catch (err: any) {
        setError(err);
        return false;
      }
      if (permission !== 'granted') {
        setError(new Error('Request to access the device orientation was rejected'));
        return false;
      }
    }

    window.addEventListener('deviceorientation', onDeviceOrientation);

    return true;
  };

  const requestAccess = useCallback(requestAccessAsync, []);
  const revokeAccess = useCallback(revokeAccessAsync, []);

  useEffect(() => {
    return (): void => {
      revokeAccess();
    };
  }, [revokeAccess]);

  return {
    // prevOrientation,
    orientation,
    error,
    requestAccess,
    revokeAccess,
  };
};