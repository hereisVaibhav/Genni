import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import ParticleCanvas from './components/ParticleCanvas/ParticleCanvas'
import JarvisIntro from './components/JarvisIntro/JarvisIntro'
import { Context } from './context/context'

const App = () => {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 })
  const { theme, showIntro, setShowIntro } = useContext(Context)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className='app-container' data-theme={theme || 'cyber'}>
      {/* Iron Man JARVIS System Startup Animation Overlay */}
      {showIntro && <JarvisIntro onComplete={() => setShowIntro(false)} />}

      {/* Interactive Neural Mesh Particle Background */}
      <ParticleCanvas />

      {/* Dynamic Mouse Spotlight Blur Effect */}
      <div 
        className="mouse-spotlight"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`
        }}
      />

      <Sidebar />
      <Main />
    </div>
  )
}

export default App