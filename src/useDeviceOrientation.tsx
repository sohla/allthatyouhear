import { useCallback, useEffect, useState } from 'react';


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

    if(event.alpha && event.beta && event.gamma){
      setOrientation({
        alpha: event.alpha,
        beta: event.beta + 180,
        gamma: event.gamma + 90,
      })
    }
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

    if (
      (DeviceMotionEvent as any).requestPermission
      && typeof (DeviceMotionEvent as any).requestPermission === 'function'
    ) {
      let permission: PermissionState;
      try {
        permission = await (DeviceMotionEvent as any).requestPermission();
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