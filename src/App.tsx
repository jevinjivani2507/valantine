import { useState } from "react"
import { AnimatePresence } from "motion/react"
import QuestionPage from "./components/QuestionPage"
import CelebrationPage from "./components/CelebrationPage"
import FloatingEmojis from "./components/FloatingEmojis"

function App() {
  const [accepted, setAccepted] = useState(false)

  return (
    <div className="min-h-svh overflow-hidden relative">
      <FloatingEmojis count={accepted ? 10 : 14} />
      <AnimatePresence mode="wait">
        {!accepted ? (
          <QuestionPage key="question" onAccept={() => setAccepted(true)} />
        ) : (
          <CelebrationPage key="celebration" />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
