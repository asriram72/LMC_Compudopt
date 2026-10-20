import { MotionConfig } from 'motion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FORCE_REDUCED_MOTION } from './lib/motion'

if (FORCE_REDUCED_MOTION) document.documentElement.dataset.motion = 'reduce'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion={FORCE_REDUCED_MOTION ? 'always' : 'user'}>
      <App />
    </MotionConfig>
  </StrictMode>,
)
