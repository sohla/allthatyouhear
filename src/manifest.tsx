

export type levelType = {
  floor: string,
  title: string,
  backgroundImg: string,
  introSound: string,
  introVO: string,
  introText: string,
  outroSound: string,
  outroVO: string,
  outroText: string,
  outroImg: string,
  tracksText: string,
  tracks: string[]
};

export const manifest: Map<string, levelType> = new Map([
  [
    'level1', {
      floor: 'All That You Hear',
      title: '·',
      backgroundImg: '/img/switch.jpg',
      introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+1.mp3',
      introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Level+2+Introduction.mp3',
      introText: 'intro',
      outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+1.mp3',
      outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Acknowledgement+of+Country+2023.mp3',
      outroText: 'Acknowledgement',
      outroImg: '',
      tracksText: 'Introduction and Welcome',
      tracks: [
        'https://atyh.s3.ap-southeast-2.amazonaws.com/Level+2_+WELCOME+TO+COUNTRY+06012023.mp3',
      ],
    }
  ],
  [
    'level2', {
      floor: 'Level',
      title: '2',
      backgroundImg: '/img/level1.jpg',
      introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+2.mp3',
      introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/2.+Welcome+to+the+second+floor_Lizzy.mp3',
      introText: 'intro',
      outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Travelling+Loop+06012023.mp3',
      outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Make+Your+Way+to+level+3.mp3',
      outroText: 'Make your way to Level 3',
      outroImg: '/img/stairs2.jpg',
      tracksText: 'Move through the corridors to discover layers of sound.',
      tracks: [
        'https://atyh.s3.ap-southeast-2.amazonaws.com/LIFTS+1+Side+A.mp3',
        'https://atyh.s3.ap-southeast-2.amazonaws.com/LIFTS+1+Side+B.mp3',
      ]
    }
  ],
  [
    'level3', {
      floor: 'Level',
      title: '',
      backgroundImg: '/img/level3.jpg',

      introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+3.mp3',
      introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/3.+Welcome+to+the+third+floor_Zoe.mp3',
      introText: 'intro',
      outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Travelling+Loop+06012023.mp3',
      outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Make+Your+Way+to+level+4.mp3',
      outroText: 'Make your way to Level 4',
      outroImg: '/img/stairs2.jpg',
      tracksText: 'Move through the corridors to discover layers of sound.',
      tracks: [
        'https://atyh.s3.ap-southeast-2.amazonaws.com/The+Building_Main+Track+211122.mp3',
        'https://atyh.s3.ap-southeast-2.amazonaws.com/The+Building_Side+1+211122.mp3',
        'https://atyh.s3.ap-southeast-2.amazonaws.com/The+Building_Side+2+211122.mp3',
        // 'https://atyh.s3.ap-southeast-2.amazonaws.com/sin.mp3',
        // 'https://atyh.s3.ap-southeast-2.amazonaws.com/whiteNoise.mp3',
      ]
    }
  ],
  [
    'level4', {
      floor: 'Level',
      title: '',
      backgroundImg: '/img/level4.jpg',

      introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+1.mp3',
      introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/4.+Welcome+to+the+fourth+floor_Lizzy.mp3',
      introText: 'intro',
      outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Travelling+Loop+06012023.mp3',
      outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Make+Your+Way+to+level+5.mp3',
      outroText: 'Make your way to Level 5',
      outroImg: '/img/stairs2.jpg',
      tracksText: 'Move through the corridors to discover layers of sound.',
      tracks: [
        'https://atyh.s3.ap-southeast-2.amazonaws.com/GHOSTS+1_Music+21112022.mp3',
        'https://atyh.s3.ap-southeast-2.amazonaws.com/GHOSTS+1_Stories+A+side+21112022.mp3',
        'https://atyh.s3.ap-southeast-2.amazonaws.com/GHOSTS+1_Stories+B+side+21112022.mp3',
        // 'https://atyh.s3.ap-southeast-2.amazonaws.com/sin.mp3',
        // 'https://atyh.s3.ap-southeast-2.amazonaws.com/whiteNoise.mp3',
      ]
    }
  ],  
  [
    'level5', {
      floor: 'Level',
      title: '',
      backgroundImg: '/img/level5.jpg',

      introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+2.mp3',
      introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/5.+Welcome+to+the+fifth+floor_Zoe.mp3',
      introText: 'intro',
      outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Travelling+Loop+06012023.mp3',
      outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Make+Your+Way+to+level+6.mp3',
      outroText: 'Make your way to Level 6',
      outroImg: '/img/stairs2.jpg',
      tracksText: 'Move through the corridors to discover layers of sound.',
      tracks: [
        'https://atyh.s3.ap-southeast-2.amazonaws.com/LEVEL+5_Sounds+MAIN+TRACK+03012023.mp3',
        'https://atyh.s3.ap-southeast-2.amazonaws.com/LEVEL+5_Sounds+SURROUND+SOUNDS+03012023.mp3',
        // 'https://atyh.s3.ap-southeast-2.amazonaws.com/GHOSTS+1_Stories+B+side+21112022.mp3',
        // 'https://atyh.s3.ap-southeast-2.amazonaws.com/sin.mp3',
        // 'https://atyh.s3.ap-southeast-2.amazonaws.com/whiteNoise.mp3',
      ]
    }
  ],    
]);

