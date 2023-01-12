import {DeviceOrientation} from './useDeviceOrientation';
import Quaternion from 'quaternion';

//-----------------------------------------------------------------------
export class Vec3 { 
  x: number = 0;
  y: number = 0;
  z: number = 0;
}

//-----------------------------------------------------------------------
export const orientationToVec3 = (orientation: DeviceOrientation, mul: number) => {

  var v = new Vec3()

  let a = orientation ? Math.floor(orientation.alpha!) : 0
  let b = orientation ? Math.floor(orientation.beta!) : 0
  let g = orientation ? Math.floor(orientation.gamma!) : 0

  let rad = Math.PI / 180.0
  let q = Quaternion.fromEuler(a * rad, b * rad, g * rad, 'YXZ') //ZXY
  let e = new Quaternion(q).toEuler()

  // range 0..2
  v.x = ((e.roll / Math.PI) + 1) * mul
  v.y = ((e.pitch / Math.PI) + 0.5) * mul
  v.z = ((e.yaw / Math.PI) + 1) * mul 

  // fold 0..1
  if(v.x > 1){v.x = 1 - (v.x - 1)}
  if(v.y > 1){v.y = 1 - (v.y - 1)}
  if(v.z > 1){v.z = 1 - (v.z - 1)}

  return v
}
