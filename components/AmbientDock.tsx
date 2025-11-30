"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  CloudRain,
  Trees,
  Bird,
  Volume2,
  VolumeX,
  Music,
  Waves,
} from "lucide-react";
import type { AmbientSound } from "@/constants/types";
import { Slider } from "@/components/ui/slider";

const SOUND_LINKS: Record<string, string> = {
  rain: "/sounds/rain.mp3",
  forest: "/sounds/forest.mp3",
  ocean: "/sounds/ocean.mp3",
  birds: "/sounds/birds.mp3",
};

const ICONS: Record<string, React.ReactNode> = {
  rain: <CloudRain size={20} />,
  forest: <Trees size={20} />,
  ocean: <Waves size={20} />,
  birds: <Bird size={20} />,
};

const AmbientDock = () => {
  const [sounds, setSounds] = useState<AmbientSound[]>([
    { id: "rain", name: "Rain", icon: "rain", active: false },
    { id: "forest", name: "Nature", icon: "forest", active: false },
    { id: "ocean", name: "Ocean", icon: "ocean", active: false },
    { id: "birds", name: "Birds", icon: "birds", active: false },
  ]);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    sounds.forEach((sound) => {
      const audio = new Audio(SOUND_LINKS[sound.id]);
      audio.crossOrigin = "anonymous";
      audio.loop = true;
      audio.volume = volume / 100;
      audioRefs.current[sound.id] = audio;
    });

    return () => {
      Object.values(audioRefs.current).forEach((audio) => audio.pause());
    };
  }, []);

  useEffect(() => {
    Object.values(audioRefs.current).forEach((audio) => {
      audio.volume = volume / 100;
    });
  }, [volume]);

  const toggleSound = (id: string) => {
    setSounds((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );

    const audio = audioRefs.current[id];
    const sound = sounds.find((s) => s.id === id);

    if (!sound?.active) {
      !isMuted && audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      Object.entries(audioRefs.current).forEach(([key, audio]) => {
        const sound = sounds.find((s) => s.id === key);
        if (newMuted) {
          audio.pause();
        } else if (sound?.active) {
          audio.play();
        }
      });
      return newMuted;
    });
  };

  const anyActive = sounds.some((s) => s.active && !isMuted);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`bg-card/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl transition-all duration-300 ${
          isExpanded ? "p-4" : "p-2"
        }`}
      >
        {/* Expanded Content */}
        {isExpanded && (
          <div className="mb-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Ambient Sounds
              </span>
              <button
                onClick={toggleMute}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>

            {anyActive && (
              <div className="flex items-center gap-3 px-1">
                <Volume2 size={14} className="text-muted-foreground shrink-0" />
                <Slider
                  value={[volume]}
                  onValueChange={(v) => setVolume(v[0])}
                  max={100}
                  step={1}
                  className="w-32"
                />
                <span className="text-xs text-muted-foreground w-8">
                  {volume}%
                </span>
              </div>
            )}
          </div>
        )}

        {/* Dock Icons */}
        <div className="flex items-center gap-2">
          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 ${
              isExpanded
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            <Music size={20} />
          </button>

          {/* Sound Buttons */}
          {sounds.map((sound) => (
            <button
              key={sound.id}
              onClick={() => toggleSound(sound.id)}
              className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 relative ${
                sound.active && !isMuted
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
              title={sound.name}
            >
              {ICONS[sound.icon]}
              {sound.active && !isMuted && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </button>
          ))}

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 ${
              isMuted
                ? "bg-destructive/10 text-destructive"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmbientDock;
