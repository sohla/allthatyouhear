
import React from 'react';



export const Title = (props: {floor: String, title: String}) => {
  return (
    <div className="bg-black  bg-opacity-0 pt-12 w-full self-center text-center">
      <div className='bg-opacity-80 text-black p-2 font-bold text-3xl opacity-80'>{props.floor}</div>
      <div className='  text-black font-extrabold text-7xl  pb-4 opacity-80' >{props.title}</div>
    </div>
  )
}