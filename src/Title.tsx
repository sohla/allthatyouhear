
import React from 'react';



export const Title = (props: {floor: String, title: String}) => {
  return (
    <div className="bg-black  bg-opacity-0 pt-12 w-full self-center text-center">
      <div className=' text-black font-bold text-2xl'>{props.floor}</div>
      <div className='  text-black font-extrabold text-7xl pt-10 opacity-70' >{props.title}</div>
    </div>
  )
}