

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
  // [
  //   'level0', {
  //     floor: 'tester',
  //     title: 'debug',
  //     backgroundImg: '/img/level2.jpg',
  //     introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+2.mp3',
  //     introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/2.+Welcome+to+the+second+floor_Lizzy.mp3',
  //     introText: 'intro',
  //     outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Travelling+Loop+06012023.mp3',
  //     outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Make+Your+Way+to+level+3.mp3',
  //     outroText: 'debug',
  //     outroImg: '/img/stairs3.jpg',
  //     tracksText: 'Introduction and Welcome',
  //     tracks: [
  //       'https://atyh.s3.ap-southeast-2.amazonaws.com/whiteNoise.mp3',
  //       'https://atyh.s3.ap-southeast-2.amazonaws.com/sin.mp3',
  //     ],
  //   }
  // ],

  [
    'level1', {
      floor: 'All That You Hear',
      title: '',
      backgroundImg: '/img/flag.png',
      introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+2.mp3',
      introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Level+2+Introduction.mp3',
      introText: 'intro',
      outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+1.mp3',
      outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Acknowledgement+of+Country+2023.mp3',
      outroText: 'Acknowledgement',
      outroImg: '/img/flag.png',
      tracksText: 'Introduction and Welcome',
      tracks: [
        'https://atyh.s3.ap-southeast-2.amazonaws.com/Level+2_+WELCOME+TO+COUNTRY+06012023.mp3',
      ],
    }
  ],
  [
    'level2', {
      floor: '',
      title: '2',
      backgroundImg: '/img/level1.jpg',
      introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+2.mp3',
      introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/2.+Welcome+to+the+second+floor_Lizzy.mp3',
      introText: 'intro',
      outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Travelling+Loop+06012023.mp3',
      outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Make+Your+Way+to+level+3.mp3',
      outroText: 'Make your way to Level 3',
      outroImg: '/img/stairs3.jpg',
      tracksText: 'Move through the corridors to discover layers of sound.',
      tracks: [
        'https://atyh.s3.ap-southeast-2.amazonaws.com/LIFTS+1+Side+A.mp3',
        'https://atyh.s3.ap-southeast-2.amazonaws.com/LIFTS+1+Side+B.mp3',
      ]
    }
  ],
  [
    'level3', {
      floor: '',
      title: '',
      backgroundImg: '/img/level3.jpg',
      introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+3.mp3',
      introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/3.+Welcome+to+the+third+floor_Zoe.mp3',
      introText: 'intro',
      outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Travelling+Loop+06012023.mp3',
      outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Make+Your+Way+to+level+4.mp3',
      outroText: 'Make your way to Level 4',
      outroImg: '/img/stairs3.jpg',
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
      floor: '',
      title: '',
      backgroundImg: '/img/level4.jpg',

      introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+1.mp3',
      introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/4.+Welcome+to+the+fourth+floor_Lizzy.mp3',
      introText: 'intro',
      outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Travelling+Loop+06012023.mp3',
      outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Make+Your+Way+to+level+5.mp3',
      outroText: 'Make your way to Level 5',
      outroImg: '/img/stairs3.jpg',
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
      floor: '',
      title: '',
      backgroundImg: '/img/level5.jpg',
      introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+2.mp3',
      introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/5.+Welcome+to+the+fifth+floor_Zoe.mp3',
      introText: 'intro',
      outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Travelling+Loop+06012023.mp3',
      outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Make+Your+Way+to+level+6.mp3',
      outroText: 'Make your way to Level 6',
      outroImg: '/img/stairs3.jpg',
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
  [
    'level6', {
      floor: '',
      title: '',
      backgroundImg: '/img/level6.jpg',
      introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+3.mp3',
      introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/6.+Welcome+to+the+sixth+floor_Lizzy.mp3',
      introText: 'intro',
      outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Travelling+Loop+06012023.mp3',
      outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Make+Your+Way+to+level+7.mp3',
      outroText: 'Make your way to Level 7',
      outroImg: '/img/stairs3.jpg',
      tracksText: 'Move through the corridors to discover layers of sound.',
      tracks: [
        'https://atyh.s3.ap-southeast-2.amazonaws.com/Lifts+2+Side+A.mp3',
        'https://atyh.s3.ap-southeast-2.amazonaws.com/Lifts+2+Side+B.mp3',
        // 'https://atyh.s3.ap-southeast-2.amazonaws.com/GHOSTS+1_Stories+B+side+21112022.mp3',
        // 'https://atyh.s3.ap-southeast-2.amazonaws.com/sin.mp3',
        // 'https://atyh.s3.ap-southeast-2.amazonaws.com/whiteNoise.mp3',
      ]
    }
  ],      
  [
    'level7', {
      floor: '',
      title: '',
      backgroundImg: '/img/level7.jpg',
      introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+1.mp3',
      introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/7.+Welcome+to+the+seventh+floor_Zoe.mp3',
      introText: 'intro',
      outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Travelling+Loop+06012023.mp3',
      outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Make+Your+Way+to+level+8.mp3',
      outroText: 'Make your way to Level 8',
      outroImg: '/img/stairs3.jpg',
      tracksText: 'Move through the corridors to discover layers of sound.',
      tracks: [
        'https://atyh.s3.ap-southeast-2.amazonaws.com/Layer+Upon+Layer+Main+Track+02012023.mp3',
        'https://atyh.s3.ap-southeast-2.amazonaws.com/Layer+Upon+Layer+Surround+Voices+Track+02012023+MONO.mp3',
        // 'https://atyh.s3.ap-southeast-2.amazonaws.com/GHOSTS+1_Stories+B+side+21112022.mp3',
        // 'https://atyh.s3.ap-southeast-2.amazonaws.com/sin.mp3',
        // 'https://atyh.s3.ap-southeast-2.amazonaws.com/whiteNoise.mp3',
      ]
    }
  ],      
  [
    'level8', {
      floor: '',
      title: '',
      backgroundImg: '/img/level8.jpg',
      introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+2.mp3',
      introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/8.+Welcome+to+the+eighth+floor_Lizzy.mp3',
      introText: 'intro',
      outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Travelling+Loop+06012023.mp3',
      outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Make+Your+Way+to+level+9.mp3',
      outroText: 'Make your way to Level 9',
      outroImg: '/img/stairs3.jpg',
      tracksText: 'Move through the corridors to discover layers of sound.',
      tracks: [
        'https://atyh.s3.ap-southeast-2.amazonaws.com/GHOSTS+2_Music+21112022.mp3',
        'https://atyh.s3.ap-southeast-2.amazonaws.com/GHOSTS+2_Stories+A+side+21112022.mp3',
        'https://atyh.s3.ap-southeast-2.amazonaws.com/GHOSTS+2_Stories+B+side+21112022.mp3',
        // 'https://atyh.s3.ap-southeast-2.amazonaws.com/GHOSTS+1_Stories+B+side+21112022.mp3',
        // 'https://atyh.s3.ap-southeast-2.amazonaws.com/sin.mp3',
        // 'https://atyh.s3.ap-southeast-2.amazonaws.com/whiteNoise.mp3',
      ]
    }
  ],   
  [
    'level9', {
      floor: '',
      title: '',
      backgroundImg: '/img/level9.jpg',
      introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+3.mp3',
      introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/9.+Welcome+to+the+ninth+floor_Zoe.mp3',
      introText: 'intro',
      outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Travelling+Loop+06012023.mp3',
      outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Final+Thank+you.mp3',
      outroText: 'thank you',
      outroImg: '/img/glass.jpg',
      tracksText: 'Move through the corridors to discover layers of sound.',
      tracks: [
        'https://atyh.s3.ap-southeast-2.amazonaws.com/Always+the+Same.mp3',

        'https://atyh.s3.ap-southeast-2.amazonaws.com/exitTracks.mp3',
      ]
    }
  ],          
]);

