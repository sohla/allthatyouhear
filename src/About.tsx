import React, { useState, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { InfoIcon } from './Icons';


const About = () => {
  let [isOpen, setIsOpen] = useState(false)
  let focusRef = useRef(null)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="fixed">
      
        <button
          type="button"
          onClick={openModal}
          className=""
        >
          <InfoIcon color={"MidnightBlue"}/>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={focusRef} onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-bold "
                    ref={focusRef}
                  >
                    Audio Experience FAQ
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-1xl ">
                    This audio experience is designed to be listened to from the Nicholas Building, 
                    Melbourne, VIC, Australia. The Nicholas building is home to a community of over 200 artists, 
                    creatives and many independent enterprises. Many studios are private and not open to the public. 
                    We respectfully ask that you keep noise to a minimum.
                    </p>

                    <p className=" italic font-bold pt-2 ">
                    What equipment do I need to access the audio experience? 
                    </p>
                    <p>
                    You will require a smart phone with mobile data (for internet access) and your own set of personal headphones. 
                    </p>
                    <p className=" italic font-bold pt-2 ">
                    How do I access the audio experience?
                    </p>
                    Once you are on location at the Nicholas building use this link to access the audio tracks. 
                    <p className=" italic font-bold pt-2 ">
                    Where do I begin?
                    </p>
                    The experience begins from Level 1 of The Nicholas Building outside of Flinders Lane Gallery. 
                    <p className=" italic font-bold pt-2 ">
                    What happens when I walk around?
                    </p>
                    The audio experience has been specially designed across more than one layer of sound. 
                    When you gently move your phone around the room(on select floors), you will hear the second soundtrack. 
                    These layers are designed to be listened to simultaneously as you walk through the building.
                    <p className=" italic font-bold pt-2 ">
                    Do I have to keep moving my phone?
                    </p>
                    In short, no. As you walk through the space carrying your phone, you will notice that 
                    different soundtracks play automatically. If you want to experience more, pause and 
                    experiment with slowly moving your phone around the room as if you are standing on a pivot point.
                    <p className=" italic font-bold pt-2 ">
                    How many soundtracks are there?
                    </p>
                    This work is dynamic and ever evolving. There will eventually be soundtracks on levels 1-9 of the building. 
                    <p className=" italic font-bold pt-2 ">
                    What time does the building close?
                    </p>
                    The Nicholas Building is open from 8am - 5pm daily. 
                    <p className=" italic font-bold pt-2 ">
                    How can I listen from home?
                    </p>
                    The audio experience is accessed from inside the Nicholas building.



                    <div className="font-bold pt-2 underline text-center">
                    Email :
                      <a href="mailto:/hello@allthatyouhear.au"> hello@allthatyouhear.au</a>
                    </div>

                  </div>

                  <div className="mt-12 text-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <p className=" text-xs text-center pt-4">
                    ©2022 by All That You Hear.
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default About;