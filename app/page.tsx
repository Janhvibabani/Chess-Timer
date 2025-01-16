"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "./globals.css";
import CustomDropdown from './components/CustomDropdown';

export default function Home() {
  const router = useRouter();
  const [player1, setPlayer1] = useState("PLAYER 1");
  const [player2, setPlayer2] = useState("PLAYER 2");
  const [selectedTheme, setSelectedTheme] = useState("classic");
  const [duration, setDuration] = useState("5");
  const [layout, setLayout] = useState("horizontal");

  const themes = [
    { id: "classic", name: "Classic", colors: ["#FFFFFF", "#000000"] },
    { id: "cream", name: "Cream", colors: ["#FFFBE6", "#647C90"] },
    { id: "pastel", name: "Pastel", colors: ["#F8FAE5", "#43766C"] },
  ];

  const handleStart = () => {
    const settings = {
      player1,
      player2,
      theme: selectedTheme,
      duration: parseInt(duration),
      layout
    };
    
    const queryString = new URLSearchParams({
      settings: JSON.stringify(settings)
    }).toString();
    
    router.push(`/timer/${layout}Layout?${queryString}`);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-start pt-20 p-15 ml--12">
      <div className="flex flex-col items-center gap-2 w-full max-w-md mx-8">
        <div className="flex items-center justify-left -space-x-20 ml-8">
            <h1 className="text-[#647C90] text-7xl mb-8 flex flex-col gap-0 font-['CustomFont'] z-10">
              <span>CHESS</span>
              <span>TIMER</span>
            </h1>
            <img 
            src="/images/chesso.png" 
            alt="Chess board and pieces" 
            className="w-100 h-auto ml-10"
          />
        </div>
        

        <div className="grid grid-cols-2 gap-6 w-full mb-12">
          <input
            type="text"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="text-black text-2xl text-center font-['CustomFont'] bg-transparent border-b-2 border-[#647C90] focus:outline-none"
          />
          <input
            type="text"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="text-black text-2xl text-center font-['CustomFont'] bg-transparent border-b-2 border-[#647C90] focus:outline-none"
          />
          
          <div className="col-span-2 flex flex-col items-center gap-4">
            <p className="text-black text-2xl text-center font-['CustomFont']">THEME</p>
            <div className="flex gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                    selectedTheme === theme.id ? 'border-[#647C90]' : 'border-transparent'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full flex">
                    <div className="w-1/2 rounded-l-full" style={{ backgroundColor: theme.colors[0] }}></div>
                    <div className="w-1/2 rounded-r-full" style={{ backgroundColor: theme.colors[1] }}></div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-black text-2xl text-center font-['CustomFont'] mb-2">DURATION</p>
            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="text-black text-2xl text-center font-['CustomFont'] bg-transparent border-b-2 border-[#647C90] focus:outline-none w-20"
            />
          </div>

          <div className="flex flex-col items-center">
            <p className="text-black text-2xl text-center font-['CustomFont'] mb-2">LAYOUT</p>
            <CustomDropdown layout={layout} setLayout={setLayout} />
          </div>
        </div>
        <button 
          onClick={handleStart}
          className="relative bg-white text-[#647C90] text-2xl font-['CustomFont'] font-bold py-3 px-12 rounded-[50%] border-2 border-[#647C90]">
          Start
          <span className="absolute text-yellow-400 text-5xl -top-3 -left-3">✨</span>
        </button>
      </div>
    </div>
  );
}
