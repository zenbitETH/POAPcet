import React, { useState } from 'react';
import Logo from '../Public/banner.png';
import Attest from '../Public/POAPcetlogo.png'
import POAP from '../Public/poap.png'
import OP from '../Public/opLogo.png'
import SE from '../Public/ScalingETH.png'

interface Section {
  id: number;
  title: string;
}

const sections: Section[] = [
  { id: 1, title: 'Start' },
  { id: 2, title: 'Setting' },
  { id: 3, title: 'Solution' },
  { id: 4, title: 'Demo' },
  { id: 5, title: 'Built' },
  { id: 6, title: 'Ending' },
];

const Carousel: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(sections[0]);

  const goToPrevious = () => {
    const currentIndex = sections.findIndex((section) => section.id === activeSection.id);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    const currentIndex = sections.findIndex((section) => section.id === activeSection.id);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };

  return (
    <div className="relative mx-44 ">
      <div className="max-w-6xl h-full transition duration-300 ease-in-out mx-auto">
        {activeSection.id === 1 && (
          <div className="">
             <div className=''><img className="mx-auto" width={640} src={Logo} alt="" /></div>
             <div className='text-3xl grid grid-cols-3 items-center ml-20'>
              <span className='text-right mt-7'>developed @</span> 
              <span className='mx-5 mx-auto'><img src={SE} width={175} alt="" /></span>
              <span className='text-left mt-7'>2023 </span>
            </div>
          </div>
        )}
        {activeSection.id === 2 && (
          <div className="grid grid-cols-2 items-center text-center gap-5 w-full ">
            <div className='border-black/60 border-2 rounded-2xl h-96 grid grid-cols-2 items-center mx-auto gap-5 px-10'>
              <div className='col-span-2 text-2xl'>Current onboarding process <div className='text-base'>🪨 Limited to web3 niches</div> </div>
              <div className='carBG'> <div className='text-4xl'>🎫</div> 1. Onboarding event</div>
              <div className='carBG'> <div className='text-4xl'>🦊</div> 2. Download and set wallet</div>
              <div className='carBG'> <div className='text-4xl'>🎖️</div> 3. Claim POAP</div>
              <div className='carBG'> <div className='text-4xl'>🥵</div> 4. Mainnet interactions</div>
            </div>
            <div className='border-red-500 border-2 rounded-2xl h-96 grid grid-cols-2 items-center mx-auto gap-5 px-10'>
              <div className='col-span-2 text-2xl'>POAPcet onboarding process <div className='text-base'>🌎 Scalable to the next billion</div> </div>
              <div className='carBG2'> <div className='text-4xl'>🎫</div> 1. Onboarding event</div>
              <div className='carBG2'> <div className='text-4xl'>🦊</div> 2. Download and set wallet</div>
              <div className='carBG2'> <div className='text-4xl'>🎖️</div> 3. Claim POAP</div>
              <div className='carBG2'> <div className='text-4xl'>🤓</div> 4. Testnet interactions</div>
            </div>
          </div>
        )}

        {activeSection.id === 3 && (
          <div className="grid grid-cols-2 items-center text-center gap-5 w-full ">
          <div className='border-black/60 border-2 rounded-2xl h-96 grid grid-cols-3 items-center mx-auto gap-5 px-10'>
            <div className='col-span-3 text-2xl'>Yet... testnet UX is fragmented </div>
            <div className='carBG'> <div>❌</div> Public faucet or manual tx</div>
            <div className='carBG'> <div>❌</div> Only testnet faucets</div>
            <div className='carBG'> <div>❌</div> POAP without attestation</div>
          </div>
          <div className='border-red-500 border-2 rounded-2xl h-96 grid grid-cols-3 items-center mx-auto gap-5 px-10'>
            <div className='col-span-3 text-2xl'><div className=''><img className="mx-auto" width={250} src={Logo} alt="" /></div></div>
            <div className='carBG2'> <div>✅</div> Create a custom faucet</div>
            <div className='carBG2'> <div>✅</div> Testnet + Mainnet</div>
            <div className='carBG2'> <div>✅</div> POAP + attestation</div>
            
          </div>
        </div>
        )}

        {activeSection.id === 4 && (
          <div className="text-6xl">
            <div className=''><img className="mx-auto" width={550} src={Logo} alt="" /></div>
            <div className='mt-5'> Demo time!</div>
          </div>
        )}

        {activeSection.id === 5 && (
          <div className="grid grid-cols-3 gap-5">
            <div className='col-span-3 text-5xl grid items-center'>built with</div>
            <div className='carBG3'><div className=''><img className="mx-auto my-10" width={100} src={Attest} alt="" /></div>Attestation contract</div>
            <div className='carBG3'><div className=''><img className="mx-auto my-10" width={80} src={POAP} alt="" /></div>POAP API</div>
            <div className='carBG3'><div className=''><img className="mx-auto my-10" width={100} src={OP} alt="" /></div>Optimism Goerli and OP mainnet</div>
          </div>
        )}

        {activeSection.id === 6 && (
          <div className="section-content"> 
            <div className="grid grid-cols-3 gap-5 text-2xl font-exo justify-items-center">
          <a href="https://github.com/HabacucMX">
            <div className="teamMB">
              <img src="https://avatars.githubusercontent.com/u/57845110?s=400&u=5460231e3addfd30b2f4f35650c81206e3d7552f&v=4" className="bg-deco-100 rounded-full h-60 w-60"/>
              Habacuc<div className="text-lg text-deco-400">R&D Engineer</div></div></a>
          <a href="https://github.com/gumacs92">
            <div className="teamMB">
              <img src="https://avatars.githubusercontent.com/u/57172347?v=4" className="bg-deco-100 rounded-full h-60 w-60"/>
              Shyam<div className="text-lg text-deco-400">Blockchain Engineer</div></div>
          </a>
          <a href="https://github.com/Riki0923">
            <div className="teamMB">
              <img src="https://static.dw.com/image/39979784_804.jpg" className="bg-deco-100 rounded-full h-60 w-60"/>
              Riki<div className="text-lg text-deco-400">Fullstack Engineer</div></div></a>
          
        </div>
            <div className='grid grid-cols-3 mt-44 text-center'>
              <div className='col-span-3 text-5xl grid items-center'>Live demo</div>
              <div className='text-3xl col-span-3 text-red-500'>poapcet.zenbit.mx</div>
              <div className='col-span-3 text-5xl mt-10 grid items-center'>Thanks!</div>
            </div>
          </div>
        )}
      </div>

      <button
        className="absolute left-0 top-1/2 transform
         -translate-y-1/2 bg-gray-200 hover:text-white
          hover:bg-red-500 text-2xl m-auto h-12 w-12 px-2
          rounded-full shadow-md items-center grid text-center"
        onClick={goToPrevious}
      >
        ◀
      </button>
      <button
        className="absolute right-0 top-1/2 transform
         -translate-y-1/2 bg-gray-200 hover:text-white
          hover:bg-red-500 text-2xl  m-auto h-12 w-12 px-2
          rounded-full shadow-md items-center grid text-center"
        onClick={goToNext}
      >
        ►
      </button>
    </div>
  );
};

export default Carousel;
