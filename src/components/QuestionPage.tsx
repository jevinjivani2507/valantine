import { useState, useCallback } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

const noTexts = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Wrong button!",
  "Pls say yes",
  "You're breaking my heart",
  "I'll be sad...",
  "Just click Yes!",
  "*crying*",
]

interface Props {
  onAccept: () => void
}

export default function QuestionPage({ onAccept }: Props) {
  const [noCount, setNoCount] = useState(0)
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 })

  const noScale = Math.max(0.3, 1 - noCount * 0.12)
  const yesScale = Math.min(1.6, 1 + noCount * 0.1)
  const noText = noTexts[Math.min(noCount, noTexts.length - 1)]

  const handleNoHover = useCallback(() => {
    if (noCount >= 3) {
      const x = (Math.random() - 0.5) * 250
      const y = (Math.random() - 0.5) * 250
      setNoBtnPos({ x, y })
    }
  }, [noCount])

  const handleNoClick = useCallback(() => {
    setNoCount((n) => n + 1)
    if (noCount >= 3) {
      const x = (Math.random() - 0.5) * 250
      const y = (Math.random() - 0.5) * 250
      setNoBtnPos({ x, y })
    }
  }, [noCount])

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-svh px-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
    >
      {/* Pulsing heart icon */}
      <motion.div
        className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center mb-8 shadow-md shadow-pink-200/50"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart className="w-10 h-10 text-pink-500 fill-pink-500" />
      </motion.div>

      {/* Question text */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-foreground text-center mb-10 leading-tight"
        style={{ fontFamily: "'Dancing Script', cursive" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Will you be my
        <br />
        Valentine?
      </motion.h1>

      {/* Buttons */}
      <div className="flex items-center gap-5 relative">
        {/* YES button */}
        <motion.div
          animate={{ scale: yesScale }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Button
            onClick={onAccept}
            className="bg-gradient-to-b from-pink-400 to-rose-600 hover:from-pink-500 hover:to-rose-700 text-white text-lg font-bold px-8 py-6 rounded-2xl shadow-lg shadow-pink-300/50 cursor-pointer border-0 tracking-wide"
          >
            YES 💖
          </Button>
        </motion.div>

        {/* NO button */}
        <motion.div
          animate={{
            scale: noScale,
            x: noBtnPos.x,
            y: noBtnPos.y,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onHoverStart={handleNoHover}
          whileHover={
            noCount < 3
              ? {
                  x: [0, -4, 4, -4, 4, 0],
                  transition: { duration: 0.4 },
                }
              : undefined
          }
        >
          <Button
            onClick={handleNoClick}
            variant="outline"
            className="text-muted-foreground border-pink-200 hover:bg-pink-50 cursor-pointer rounded-xl"
          >
            {noText}
          </Button>
        </motion.div>
      </div>

      {/* Hint text */}
      {noCount >= 3 && (
        <motion.p
          className="mt-8 text-sm text-pink-400 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Psst... the right answer is on the left 👀
        </motion.p>
      )}

      {noCount >= 6 && (
        <motion.p
          className="mt-2 text-xs text-pink-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          There's only one correct answer here...
        </motion.p>
      )}
    </motion.div>
  )
}
