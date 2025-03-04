'use client';

import { Orbitron } from 'next/font/google';
import Chat from '../components/Chat';
import ParameterGuide from '../components/ParameterGuide';

const orbitron = Orbitron({ 
  weight: ['400'],
  subsets: ['latin']
});

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-6 px-4 sm:py-12">
      <div className="text-center px-4">
        <h1 className={`${orbitron.className} text-gray-900 text-4xl sm:text-6xl mb-4 gift-container`}>
          <span className="gift-text">Smartpresent</span>
        </h1>
        <p className={`${orbitron.className} text-gray-600 text-lg sm:text-xl subtitle-animation`}>
          Dein cleverer Geschenke - Finder
        </p>
      </div>
      
      <div className="w-full max-w-4xl px-2 sm:px-4 mx-auto mt-8 sm:mt-12">
        <ParameterGuide />
        <Chat />
      </div>
    </div>
  );
}
