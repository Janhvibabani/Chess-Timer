"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Pause, Play, X } from 'lucide-react';

interface TimerSettings {
  player1: string;
  player2: string;
  theme: string;
  duration: number;
  increment: number;
  layout: string;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerticalLayout />
    </Suspense>
  );
}

function VerticalLayout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [settings, setSettings] = useState<TimerSettings | null>(null);
  const [player1Time, setPlayer1Time] = useState(0);
  const [player2Time, setPlayer2Time] = useState(0);
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on component mount
  useEffect(() => {
    audioRef.current = new Audio('/sound/beep.mp3');
  }, []);

  const playTimeoutSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.log('Error playing sound:', error));
    }
  };

  // Initialize timers when settings are loaded
  useEffect(() => {
    if (settings) {
      setPlayer1Time(settings.duration * 60 * 1000);
      setPlayer2Time(settings.duration * 60 * 1000);
      setGameStarted(true);
    }
  }, [settings]);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameStarted && !isPaused) {
      interval = setInterval(() => {
        if (isPlayer1Turn) {
          setPlayer1Time(prev => {
            if (prev <= 100) {
              clearInterval(interval);
              playTimeoutSound();
              setIsPaused(true);
              return 0;
            }
            return prev - 100;
          });
        } else {
          setPlayer2Time(prev => {
            if (prev <= 100) {
              clearInterval(interval);
              playTimeoutSound();
              setIsPaused(true);
              return 0;
            }
            return prev - 100;
          });
        }
      }, 100);
    }

    return () => clearInterval(interval);
  }, [gameStarted, isPaused, isPlayer1Turn]);

  // Load settings from URL
  useEffect(() => {
    const settingsParam = searchParams.get('settings');
    if (settingsParam) {
      const parsedSettings = JSON.parse(settingsParam);
      setSettings(parsedSettings);
    }
  }, [searchParams]);

  if (!settings) {
    return <div>Loading...</div>;
  }

  const themeColors = {
    classic: ["#FFFFFF", "#000000"],
    cream: ["#FFFBE6", "#647C90"],
    pastel: ["#F8FAE5", "#43766C"]
  };

  const colors = themeColors[settings.theme as keyof typeof themeColors];

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handlePlayerSwitch = (playerNumber: 1 | 2) => {
    if ((playerNumber === 1 && isPlayer1Turn) || (playerNumber === 2 && !isPlayer1Turn)) {
      if (playerNumber === 1) {
        setPlayer1Time(prev => prev + settings!.increment * 1000);
      } else {
        setPlayer2Time(prev => prev + settings!.increment * 1000);
      }
      setIsPlayer1Turn(!isPlayer1Turn);
    }
  };

  const handlePausePlay = () => {
    setIsPaused(!isPaused);
  };

  const handleExit = () => {
    router.push('/');
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-[#1a1a1a]">
      <div className="w-[350px] h-[700px] bg-white relative">
        {/* Exit Button */}
        <button 
          className="absolute left-4 top-4 p-2 rounded-full flex items-center justify-center z-10" 
          style={{ backgroundColor: isPlayer1Turn ? colors[1] : colors[0], color: isPlayer1Turn ? colors[0] : colors[1]}}
          onClick={handleExit}
        >
          <X size={24} />
        </button>

        <div className={`grid grid-rows-[1fr,0px,1fr] h-full`}>
          {/* Player 2 Section - Make entire section clickable */}
          <div 
            className="flex flex-col items-center justify-between py-8 cursor-pointer" 
            style={{ backgroundColor: isPlayer1Turn ? colors[0] : colors[1] }}
            onClick={() => !isPlayer1Turn && !isPaused && handlePlayerSwitch(2)}
          >
            <div className="w-48 h-48 rounded-full flex items-center justify-center" style={{ backgroundColor: isPlayer1Turn ? colors[1] : colors[0] }}>
              <span className="text-4xl font-bold" style={{ color: isPlayer1Turn ? colors[0] : colors[1], transform: 'rotate(-180deg)'}}>{formatTime(player2Time)}</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: isPlayer1Turn ? colors[1] : colors[0] , transform: 'rotate(-180deg)'}}>{settings.player2}</div>
          </div>

          {/* Empty div with 0 height */}
          <div></div>

          {/* Player 1 Section - Make entire section clickable */}
          <div 
            className="flex flex-col items-center justify-between py-8 cursor-pointer" 
            style={{ backgroundColor: isPlayer1Turn ? colors[1] : colors[0] }}
            onClick={() => isPlayer1Turn && !isPaused && handlePlayerSwitch(1)}
          >
            <div className="text-2xl font-bold" style={{ color: isPlayer1Turn ? colors[0] : colors[1] }}>{settings.player1}</div>
            <div className="w-48 h-48 rounded-full flex items-center justify-center" style={{ backgroundColor: isPlayer1Turn ? colors[0] : colors[1] }}>
              <span className="text-4xl font-bold" style={{ color: isPlayer1Turn ? colors[1] : colors[0]}}>{formatTime(player1Time)}</span>
            </div>
          </div>
        </div>

        {/* Pause/Play Button positioned absolutely */}
        <button 
          className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 p-4 bg-red-600 text-white rounded-full flex items-center justify-center" 
          style={{ backgroundColor: colors[1], color: colors[0]}}
          onClick={handlePausePlay}
        >
          {isPaused ? <Play size={24} /> : <Pause size={24} />}
        </button>
      </div>
    </div>
  );
}
