import { motion, AnimatePresence } from "motion/react"
import { Heart } from "lucide-react"
import { useState, useEffect, useMemo } from "react"

const specialReasons = [
  "The way you smile at small things",
  "Your laugh that lights up any room",
  "How you always know what to say",
  "Your kindness to everyone around you",
  "The way you make ordinary moments special",
  "How you make my heart skip a beat",
  "Your beautiful soul that shines through everything",
]

export default function CelebrationPage() {
  const [loveMeter, setLoveMeter] = useState(0)
  const [reasonIndex, setReasonIndex] = useState(0)
  const [boostCount, setBoostCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setLoveMeter(100), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setReasonIndex((i) => (i + 1) % specialReasons.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const miniHearts = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: 15 + Math.random() * 70,
        y: 15 + Math.random() * 70,
        size: 10 + Math.random() * 10,
        duration: 1.5 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    []
  )

  const handleBoost = () => {
    setBoostCount((c) => c + 1)
  }

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
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
      >
        YAY!{" "}
        <motion.span
          className="inline-block"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-red-500">&#10084;&#65039;</span>
        </motion.span>
      </motion.h1>

      <motion.p
        className="mt-3 text-base md:text-lg text-pink-500 font-semibold text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        I knew you'd say yes{" "}
        <span className="text-pink-400">&#128151;</span> Love you 3000
      </motion.p>

      {/* Animated heart scene in a polaroid-style frame */}
      <motion.div
        className="mt-8 bg-white rounded-2xl p-4 pb-6 shadow-xl shadow-pink-200/50 border border-pink-100 max-w-[280px] w-full"
        initial={{ opacity: 0, y: 30, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 150 }}
      >
        <div className="bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100 rounded-xl h-48 flex items-center justify-center relative overflow-hidden">
          <motion.div
            className="text-6xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            &#128149;
          </motion.div>
          {/* Mini floating hearts inside frame */}
          {miniHearts.map((mh) => (
            <motion.span
              key={mh.id}
              className="absolute text-pink-300 select-none"
              style={{
                left: `${mh.x}%`,
                top: `${mh.y}%`,
                fontSize: mh.size,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: mh.duration,
                repeat: Infinity,
                delay: mh.delay,
              }}
            >
              {"\u2764\uFE0F"}
            </motion.span>
          ))}
        </div>
        <p className="text-center text-xs text-pink-400 mt-3 font-medium">
          Us, always &#10024;
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
            <span className="text-pink-500">&#128522;</span>
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
            <span className="text-pink-400">&#10084;&#65039;</span>
          </motion.p>
        )}
      </motion.div>

      {/* Why you're special */}
      <motion.div
        className="mt-8 bg-white rounded-2xl p-5 shadow-md border border-pink-100 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <h3 className="text-sm font-bold text-pink-500 mb-3">
          <span>&#128149;</span> Why you're special
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
        transition={{ delay: 2 }}
      >
        Made with <span className="text-red-400">&#10084;&#65039;</span> for my
        favorite
      </motion.p>
    </motion.div>
  )
}

const rainEmojis = ["\u2764\uFE0F", "\uD83D\uDC97", "\uD83D\uDC96", "\u2728"]

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
  )

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
  )
}
