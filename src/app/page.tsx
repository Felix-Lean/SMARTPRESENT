'use client';

import { Orbitron } from 'next/font/google';
import Chat from '../components/Chat';

const orbitron = Orbitron({ 
  weight: ['400'],
  subsets: ['latin']
});

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className={`${orbitron.className} text-white text-6xl mb-4 gift-container`}>
          <span className="gift-text">Smartpresent</span>
          <span className="gift" style={{ top: '-20px', left: '10px' }}>🎁</span>
          <span className="gift" style={{ top: '-15px', right: '10px' }}>🎁</span>
          <span className="sparkle" style={{ top: '0px', left: '30%' }}>✨</span>
          <span className="sparkle" style={{ top: '10px', right: '30%' }}>✨</span>
          <span className="sparkle" style={{ bottom: '0px', left: '40%' }}>✨</span>
        </h1>
        <p className={`${orbitron.className} text-white text-xl subtitle-animation`}>
          Dein cleverer Geschenke - Finder
        </p>
      </div>
      
      <div className="w-full max-w-4xl px-4 mx-auto mt-8">
        <Chat />
      </div>
    </div>
  );
}
