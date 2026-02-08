import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Music,
  MessageCircleHeart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import YouTube, { type YouTubeEvent } from "react-youtube";
import { Button } from "@/components/ui/button";
import {
  specialReasons,
  songs,
  specialMessages,
  rainEmojis,
  heroImageUrl,
} from "@/config/celebration";

export default function CelebrationPage() {
  const [loveMeter, setLoveMeter] = useState(0);
  const [reasonIndex, setReasonIndex] = useState(0);
  const [boostCount, setBoostCount] = useState(0);
  const [activeSong, setActiveSong] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [ytReady, setYtReady] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const playerRef = useRef<YouTube | null>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoveMeter(100), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setReasonIndex((i) => (i + 1) % specialReasons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleBoost = () => {
    setBoostCount((c) => c + 1);
  };

  const handleYtReady = useCallback((e: YouTubeEvent) => {
    playerRef.current = e.target;
    setYtReady(true);
    if (hasPlayed.current) {
      e.target.playVideo();
    }
  }, []);

  const handleYtPlay = useCallback(() => {
    hasPlayed.current = true;
  }, []);

  const handleSongSwitch = useCallback(
    (index: number) => {
      if (index !== activeSong) {
        setYtReady(false);
        setActiveSong(index);
      }
    },
    [activeSong]
  );

  const youtubeOpts = {
    height: "180",
    width: "100%",
    playerVars: {
      autoplay: 0 as const,
      modestbranding: 1 as const,
      rel: 0 as const,
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center min-h-svh px-5 py-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeartsRain />

      {/* YAY heading */}
      <motion.h1
        className="text-6xl md:text-7xl font-black text-foreground mt-6"
        style={{ fontFamily: "'Dancing Script', cursive" }}
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
      >
        YAY!{" "}
        <motion.span
          className="inline-block"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-red-500">{"\u2764\uFE0F"}</span>
        </motion.span>
      </motion.h1>

      <motion.p
        className="mt-3 text-base md:text-lg text-pink-500 font-semibold text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        I knew you'd say yes {"\uD83D\uDC97"} Love you 3000
      </motion.p>

      {/* Animated heart scene in a polaroid-style frame */}
      <motion.div
        className="mt-8 bg-white rounded-2xl p-4 pb-6 shadow-xl shadow-pink-200/50 border border-pink-100 max-w-[280px] w-full"
        initial={{ opacity: 0, y: 30, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 150 }}
      >
        <div className="rounded-xl overflow-hidden relative">
          {!heroLoaded && (
            <Shimmer className="w-full h-64 absolute inset-0 z-10" />
          )}
          <img
            src={heroImageUrl}
            alt="Us"
            className={`w-full h-64 object-cover transition-opacity duration-500 ${
              heroLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setHeroLoaded(true)}
          />
        </div>
        <p className="text-center text-xs text-pink-400 mt-3 font-medium">
          Us, always {"\u2728"}
        </p>
      </motion.div>

      {/* Love Meter */}
      <motion.div
        className="mt-8 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-foreground">
            Love Meter: {loveMeter}%{" "}
            <span className="text-pink-500">{"\uD83D\uDE0A"}</span>
          </span>
          <motion.button
            onClick={handleBoost}
            className="text-pink-400 text-xs font-medium flex items-center gap-1 cursor-pointer hover:text-pink-600 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="w-3 h-3 fill-current" />
            Send love
          </motion.button>
        </div>
        <div className="h-3 bg-pink-100 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-red-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${loveMeter}%` }}
            transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
          />
        </div>
        {boostCount > 0 && (
          <motion.p
            key={boostCount}
            className="text-xs text-pink-500 mt-1.5 text-center font-medium"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {boostCount === 1
              ? "Love sent! +"
              : boostCount < 5
              ? `${boostCount}x love combo! `
              : boostCount < 10
              ? `MEGA LOVE x${boostCount}! `
              : `INFINITE LOVE!!! `}
            {"\u2764\uFE0F"}
          </motion.p>
        )}
      </motion.div>

      {/* Soundtrack For You */}
      <motion.div
        className="mt-8 bg-white rounded-2xl p-5 shadow-md border border-pink-100 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <h3 className="text-sm font-bold text-pink-500 mb-4 flex items-center gap-1.5">
          <Music className="w-4 h-4" />
          Soundtrack For You {"\uD83C\uDFB5"}
        </h3>

        {/* Song chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          {songs.map((song, i) => (
            <motion.button
              key={song.id}
              onClick={() => handleSongSwitch(i)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                activeSong === i
                  ? "bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-md shadow-pink-200"
                  : "bg-pink-50 text-pink-500 hover:bg-pink-100"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {activeSong === i ? "\u25B6 " : ""}
              {song.title}
            </motion.button>
          ))}
        </div>

        {/* YouTube player */}
        <div className="relative rounded-xl overflow-hidden">
          {!ytReady && (
            <Shimmer className="w-full h-[180px] absolute inset-0 z-10" />
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={songs[activeSong].id}
              className="rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: ytReady ? 1 : 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <YouTube
                videoId={songs[activeSong].id}
                opts={youtubeOpts}
                onReady={handleYtReady}
                onPlay={handleYtPlay}
                className="w-full [&>iframe]:rounded-xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-xs text-pink-400 mt-3 text-center italic">
          "{songs[activeSong].title}" - {songs[activeSong].artist}
        </p>
        <p className="text-[10px] text-pink-300 mt-1 text-center">
          I wish I could be with you right now, just like in this song.
        </p>
      </motion.div>

      {/* Special Messages */}
      <motion.div
        className="mt-8 bg-gradient-to-br from-white to-pink-50 rounded-2xl p-5 shadow-md border border-pink-100 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7 }}
      >
        <h3 className="text-sm font-bold text-pink-500 mb-4 flex items-center gap-1.5">
          <MessageCircleHeart className="w-4 h-4" />
          Special Messages For You {"\uD83D\uDC8C"}
        </h3>

        <div className="relative min-h-[140px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIndex}
              className="text-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              <span className="text-3xl block mb-2">
                {specialMessages[messageIndex].emoji}
              </span>
              <h4
                className="text-base font-bold text-foreground mb-2"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {specialMessages[messageIndex].title}
              </h4>
              <p className="text-sm text-foreground/70 leading-relaxed italic px-2">
                "{specialMessages[messageIndex].text}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots & arrows */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() =>
              setMessageIndex(
                (i) => (i - 1 + specialMessages.length) % specialMessages.length
              )
            }
            className="text-pink-400 hover:text-pink-600 hover:bg-pink-50 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex gap-1.5">
            {specialMessages.map((_, i) => (
              <button
                key={i}
                onClick={() => setMessageIndex(i)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  messageIndex === i
                    ? "bg-pink-500 w-4"
                    : "bg-pink-200 hover:bg-pink-300"
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() =>
              setMessageIndex((i) => (i + 1) % specialMessages.length)
            }
            className="text-pink-400 hover:text-pink-600 hover:bg-pink-50 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Why you're special */}
      <motion.div
        className="mt-8 bg-white rounded-2xl p-5 shadow-md border border-pink-100 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9 }}
      >
        <h3 className="text-sm font-bold text-pink-500 mb-3">
          {"\uD83D\uDC95"} Why you're special
        </h3>
        <AnimatePresence mode="wait">
          <motion.p
            key={reasonIndex}
            className="text-foreground/70 italic text-sm leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            "{specialReasons[reasonIndex]}"
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
      <motion.p
        className="mt-auto pt-10 pb-4 text-xs text-pink-400 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        Made with <span className="text-red-400">{"\u2764\uFE0F"}</span> for my
        favorite
      </motion.p>
    </motion.div>
  );
}

function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-pink-100 rounded-xl overflow-hidden ${className}`}>
      <motion.div
        className="h-full w-full bg-gradient-to-r from-pink-100 via-white/60 to-pink-100"
        style={{ backgroundSize: "200% 100%" }}
        animate={{ backgroundPosition: ["100% 0%", "-100% 0%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function HeartsRain() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 4,
        size: 12 + Math.random() * 14,
        emoji: rainEmojis[Math.floor(Math.random() * rainEmojis.length)],
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-pink-300/60 select-none"
          style={{ left: `${h.x}%`, fontSize: h.size }}
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: ["0vh", "100vh"],
            opacity: [0, 0.7, 0.7, 0],
            rotate: [0, 20, -20, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {h.emoji}
        </motion.div>
      ))}
    </div>
  );
}
