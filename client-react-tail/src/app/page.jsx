'use client'

import { useEffect, useRef } from "react";
import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min';

export default function Home() {
  const myRef = useRef(null);

  useEffect(() => {
    let vantaEffect;
    if (myRef.current) {
      vantaEffect = HALO({
        el: myRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 750.00,
        minWidth: 500.00,
        backgroundColor: 0x1F1F20,
        size: 0.50
      });
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <main className="flex h-[770px] w-screen flex-row items-center bg-black">
      <div className="w-1/3 h-[750px] bg-black flex flex-col items-center justify-center">
        <h1 className="text-white text-5xl font-bold">mAI gym assistant</h1>
        <p className="text-white text-2xl font-bold">Your AI workout partner</p>
        <br/>
        <p className="text-white text-2xl font-bold">Customize workout plans using ai</p>
        <p className="text-white text-2xl font-bold">Tailored to your preferences</p>
        <br/>
        <p className="text-white text-2xl font-bold">Made by Benjamin Karlsson</p>
        
        
      </div>
        <div ref={myRef} className="vantajs w-1/3 h-[750px] " id="vanta"></div>
      <div className="w-1/3 h-[750px] bg-black flex flex-col items-center justify-center" >
        <p className="text-white text-4xl font-bold">Accounts created:</p>
        <p className="text-white text-2xl font-bold">{parseInt("5186").toLocaleString()}</p>
        <p className="text-white text-4xl font-bold">Workouts created:</p>
        <p className="text-white text-2xl font-bold">{parseInt("213214").toLocaleString()}</p>
        <p className="text-white text-4xl font-bold">Workouts Edited:</p>
        <p className="text-white text-2xl font-bold">{parseInt("2896714").toLocaleString()}</p>
      </div>
        
      
    </main>
  );
}
