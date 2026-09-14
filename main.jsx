import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import TiffanyPortfolio from './TiffanyPortfolio.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* reducedMotion="user": under prefers-reduced-motion, transform/layout animations
        become instant while opacity cross-fades stay — feedback without vestibular motion. */}
    <MotionConfig reducedMotion="user">
      <TiffanyPortfolio />
    </MotionConfig>
  </React.StrictMode>,
)
