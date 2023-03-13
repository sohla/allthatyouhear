import { useCallback, useEffect, useState, useRef } from 'react';



export type DeviceOrientation = {
  alpha: number,// | null
  beta: number,
  gamma: number,
}


export type DeviceMotionRate = {
  alpha: number,// | null
  beta: number,
  gamma: number,
}

export const useDeviceOrientationRef = () => {
  const [error, setError] = useState<Error | null>(null);
  // const [orientation, setOrientation] = useState<DeviceOrientation | null>(null);
  // const [motionRate, setMotionRate] = useState<DeviceMotionRate | null>(null);

  const orientation = useRef<DeviceOrientation>({alpha:0, beta:0, gamma: 0})

  const onDeviceOrientation = (event: DeviceOrientationEvent): void => {
    if(event.alpha && event.beta && event.gamma){
      orientation.current = {
        alpha: event.alpha,
        beta: event.beta + 180,
        gamma: event.gamma + 90,
      }
    }
  };

  // const onDeviceMotion = (event: DeviceMotionEvent): void => {
  //   console.log(event)
  //   if(event.rotationRate){
  //     if(event.rotationRate.alpha && event.rotationRate.beta && event.rotationRate.gamma){
  //       setMotionRate({
  //         alpha: event.rotationRate.alpha,
  //         beta: event.rotationRate.beta,
  //         gamma: event.rotationRate.gamma,
  //       })
  //     }
  //   }
  // };

  const revokeAccessAsync = async (): Promise<void> => {
    window.removeEventListener('deviceorientation', onDeviceOrientation);
    // window.removeEventListener('devicemotion', onDeviceMotion);
    // setOrientation(null)
  };

  const requestAccessAsync = async (): Promise<boolean> => {
    if (!DeviceMotionEvent) {
      setError(new Error('Device orientation event is not supported by your browser'));
      return false;
    }

    if (
      (DeviceMotionEvent as any).requestPermission
      && typeof (DeviceMotionEvent as any).requestPermission === 'function'
    ) {
      let permission: PermissionState;
      try {
        permission = await (DeviceMotionEvent as any).requestPermission();
      } catch (err) {
        setError(err as any);
        return false;
      }
      if (permission !== 'granted') {
        setError(new Error('Request to access the device orientation was rejected'));
        return false;
      }
    }

    window.addEventListener('deviceorientation', onDeviceOrientation);
    // window.addEventListener('devicemotion', onDeviceMotion, true);

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
    // motionRate,
    orientation,
    error,
    requestAccess,
    revokeAccess,
  };
};
