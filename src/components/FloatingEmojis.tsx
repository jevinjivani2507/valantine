import { motion } from "motion/react"
import { useMemo } from "react"

const emojis = ["💕", "💖", "✨", "🌸", "💐", "💎", "🦋", "💗", "🌷", "💫"]

export default function FloatingEmojis({ count = 14 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        size: 14 + Math.random() * 18,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2,
      })),
    [count]
  )

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute select-none"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: item.size,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 8, -8, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  )
}
