import React, { useState, useEffect } from 'react'
import './JarvisIntro.css'

const JarvisIntro = ({ onComplete }) => {
    const [progress, setProgress] = useState(0)
    const [statusText, setStatusText] = useState('INITIALIZING SYLI ARCHITECTURE...')
    const [bootPhase, setBootPhase] = useState('booting') // 'booting', 'ready', 'exiting'

    useEffect(() => {
        const statusLogs = [
            { at: 15, text: 'INITIALIZING QUANTUM NEURAL CORE...' },
            { at: 35, text: 'LOADING GENERATIVE LANGUAGE MODELS...' },
            { at: 60, text: 'CALIBRATING JARVIS HUD INTERFACE...' },
            { at: 85, text: 'ESTABLISHING SECURE AI SYNC LINK...' },
            { at: 100, text: 'SYSTEM ONLINE • ALL SYSTEMS NOMINAL' }
        ]

        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.floor(Math.random() * 8) + 3
                if (next >= 100) {
                    clearInterval(interval)
                    setStatusText('SYSTEM ONLINE • ALL SYSTEMS NOMINAL')
                    setBootPhase('ready')
                    return 100
                }
                const logMatch = statusLogs.find(log => log.at <= next && log.at > prev)
                if (logMatch) {
                    setStatusText(logMatch.text)
                }
                return next
            })
        }, 120)

        return () => clearInterval(interval)
    }, [])

    const handleStartSystem = () => {
        setBootPhase('exiting')
        setTimeout(() => {
            if (onComplete) onComplete()
        }, 800)
    }

    return (
        <div className={`jarvis-intro-overlay ${bootPhase}`}>
            {/* Background Grid Gridlines */}
            <div className="jarvis-grid-background"></div>
            <div className="jarvis-vignette"></div>

            {/* Central Arc Reactor HUD */}
            <div className="jarvis-core-wrapper">
                <div className="hud-ring outer-ring"></div>
                <div className="hud-ring middle-ring"></div>
                <div className="hud-ring inner-ring"></div>
                <div className="hud-ring ticks-ring"></div>

                {/* Pulsing Arc Center */}
                <div className="arc-reactor-core">
                    <div className="core-glass"></div>
                    <div className="core-light"></div>
                    <span className="core-symbol">✦</span>
                </div>
            </div>

            {/* Futuristic Telemetry HUD Text */}
            <div className="jarvis-hud-info">
                <div className="hud-corner top-left">SYS_VER: 2.0.44</div>
                <div className="hud-corner top-right">CORE: ONLINE [3.6 GHz]</div>
                <div className="hud-corner bottom-left">LATENCY: 0.04ms</div>
                <div className="hud-corner bottom-right">SECURITY: ENCRYPTED</div>

                <h1 className="jarvis-title">SYLI <span className="jarvis-sub">JARVIS OS</span></h1>
                
                <div className="boot-progress-bar-container">
                    <div 
                        className="boot-progress-fill" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="boot-status-row">
                    <span className="status-text">{statusText}</span>
                    <span className="status-percentage">{progress}%</span>
                </div>

                {bootPhase === 'ready' && (
                    <button className="jarvis-enter-btn" onClick={handleStartSystem}>
                        <span className="btn-glow"></span>
                        <span className="btn-text">⚡ INITIALIZE SYSTEM INTERFACE</span>
                    </button>
                )}
            </div>
        </div>
    )
}

export default JarvisIntro
