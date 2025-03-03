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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-12">
      <div className="text-center">
        <h1 className={`${orbitron.className} text-gray-900 text-6xl mb-4 gift-container`}>
          <span className="gift-text">Smartpresent</span>
        </h1>
        <p className={`${orbitron.className} text-gray-600 text-xl subtitle-animation`}>
          Dein cleverer Geschenke - Finder
        </p>
      </div>
      
      <div className="w-full max-w-4xl px-4 mx-auto mt-12">
        <ParameterGuide />
        <Chat />
      </div>
    </div>
  );
}
