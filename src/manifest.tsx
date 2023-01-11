

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
  ['level1', {
      floor: 'All That You Hear',
      title: '1',
      backgroundImg: '/img/noImage.jpg',
      introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+1.mp3',
      introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Level+2+Introduction.mp3',
      introText: 'intro',
      outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+1.mp3',
      outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Acknowledgement+of+Country+2023.mp3',
      outroText: 'Acknowledgement',
      outroImg: '/img/noImage.jpg',
      tracksText: 'Introduction and Welcome',
      tracks: [
        'https://atyh.s3.ap-southeast-2.amazonaws.com/Level+2_+WELCOME+TO+COUNTRY+06012023.mp3',
      ],
      
    }
  ],
  ['level2', {
    floor: 'Level',
    title: '2',
    backgroundImg: '/img/level1.jpg',
    introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+2.mp3',
    introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Welcome+to+the+second+floor.mp3',
    introText: 'intro',
    outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Travelling+Loop+06012023.mp3',
    outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Make+Your+Way+to+level+3.mp3',
    outroText: 'outro',
    outroImg: '/img/stairs.jpg',
    tracksText: 'tracks',
    tracks: [
      'https://atyh.s3.ap-southeast-2.amazonaws.com/LIFTS+1+Side+A.mp3',
      'https://atyh.s3.ap-southeast-2.amazonaws.com/LIFTS+1+Side+B.mp3',
    

    ]
}
  ],
  ['level3', {
    floor: 'Level',
    title: '3',
    backgroundImg: '/img/level2.jpg',
    introSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Tuning+Fork+2.mp3',
    introVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Welcome+to+the+second+floor.mp3',
    introText: 'intro',
    outroSound: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Travelling+Loop+06012023.mp3',
    outroVO: 'https://atyh.s3.ap-southeast-2.amazonaws.com/Make+Your+Way+to+level+3.mp3',
    outroText: 'outro',
    outroImg: '/img/stairs.jpg',
    tracksText: 'tracks',
    tracks: [
      'https://atyh.s3.ap-southeast-2.amazonaws.com/LIFTS+1+Side+A.mp3',
      'https://atyh.s3.ap-southeast-2.amazonaws.com/LIFTS+1+Side+B.mp3',
    

    ]
}
  ],
 
]);

