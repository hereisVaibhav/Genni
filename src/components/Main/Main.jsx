import React, { useContext, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'
import WorkstationDashboard from '../WorkstationDashboard/WorkstationDashboard'

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, activeMode, setActiveMode, theme, setTheme, setShowIntro, sidebarOpen, setSidebarOpen } = useContext(Context)
    const [copied, setCopied] = useState(false)
    const [liked, setLiked] = useState(null)

    const handleCardClick = (promptText) => {
        setInput(promptText)
        onSent(promptText)
    }

    const handleDiscussWithSyli = (promptText) => {
        setInput(promptText)
        onSent(promptText)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            onSent()
        }
    }

    const copyToClipboard = () => {
        const plainText = resultData.replace(/<[^>]+>/g, '')
        navigator.clipboard.writeText(plainText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const modes = [
        { id: 'smart', label: '⚡ Smart', desc: 'Fast & concise responses' },
        { id: 'creative', label: '🎨 Creative', desc: 'Imaginative & expressive ideas' },
        { id: 'code', label: '💻 Developer', desc: 'Code logic & debugging' },
        { id: 'deep', label: '🧠 Deep Thinker', desc: 'In-depth analytical breakdown' },
    ]

    const themes = [
        { id: 'cyber', label: '🌌 Cyber Space' },
        { id: 'synthwave', label: '🌆 Synthwave Neon' },
        { id: 'obsidian', label: '⚪ Minimal Obsidian' },
        { id: 'matrix', label: '💚 Matrix Terminal' },
    ]

    const quickActions = [
        "✨ Summarize key points",
        "💻 Explain this code step-by-step",
        "🚀 Brainstorm 5 unique project ideas",
        "📝 Draft a professional email"
    ]

    return (
        <div className='main'>
            <div className="nav">
                <div className="nav-left-group">
                    <button className="menu-toggle-btn" onClick={() => setSidebarOpen(prev => !prev)} title="Toggle Navigation Sidebar">
                        <img src={assets.menu_icon} alt="Menu" />
                    </button>

                    <div className="nav-logo" onClick={() => setShowIntro(true)} style={{ cursor: 'pointer' }} title="Click to Replay JARVIS System Boot">
                        {/* Animated Living Aura AI Core */}
                        <div className={`syli-aura-core ${loading ? 'thinking' : ''}`} title={loading ? 'Syli is thinking...' : 'Syli AI Core Active'}>
                            <div className="aura-ring ring-1"></div>
                            <div className="aura-ring ring-2"></div>
                            <div className="aura-ring ring-3"></div>
                        </div>

                        <div className="logo-text-group">
                            <p className="logo-title">Syli <span className="logo-suffix">AI</span></p>
                            <span className="syli-status-dot" title="Syli Engine Ready"></span>
                        </div>
                        <span className="badge">v2.0 JARVIS</span>
                    </div>
                </div>

                <div className="nav-right">
                    {/* Theme Quick Switcher */}
                    <div className="theme-switcher-wrapper" title="Select Theme Aesthetic">
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="theme-select"
                        >
                            {themes.map(t => (
                                <option key={t.id} value={t.id}>
                                    {t.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="profile-wrapper" title="Syli User Profile">
                        <img src={assets.Profile} alt="Profile" className="user-avatar" />
                    </div>
                </div>
            </div>

            <div className="main-container">
                {!showResult ? (
                    <div className="home-center-hero">
                        <div className="greet">
                            <p><span className="gradient-text">Hello, I'm Syli</span></p>
                            <p className="subtitle">What shall we create or explore today?</p>
                        </div>

                        {/* Centered Search Box with Dedicated Aura Glow */}
                        <div className="search-box-wrapper hero-search-wrapper">
                            <div className="search-box-glow"></div>
                            <div className="search-box">
                                <input
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    value={input}
                                    type="text"
                                    placeholder='Ask Syli anything...'
                                />
                                <div className="search-box-icons">
                                    <div className="mode-dropdown-wrapper" title="Change Syli AI Mode">
                                        <select
                                            value={activeMode}
                                            onChange={(e) => setActiveMode(e.target.value)}
                                            className="mode-select-dropdown"
                                        >
                                            {modes.map(m => (
                                                <option key={m.id} value={m.id} className="mode-option">
                                                    {m.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button className="icon-btn" title="Attach Asset">
                                        <img src={assets.gallery_icon} alt="Gallery" />
                                    </button>
                                    <button className="icon-btn" title="Voice Input">
                                        <img src={assets.mic_icon} alt="Voice" />
                                    </button>
                                    <button className={`icon-btn send-btn ${input ? 'active' : ''}`} onClick={() => onSent()} title="Send to Syli">
                                        <img src={assets.send_icon} alt="Send" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Preset Action Chips */}
                        <div className="quick-chips">
                            {quickActions.map((action, idx) => (
                                <span key={idx} className="chip" onClick={() => handleCardClick(action)}>
                                    {action}
                                </span>
                            ))}
                        </div>

                        {/* Live Personalized Workstation Command Center */}
                        <WorkstationDashboard onDiscussWithSyli={handleDiscussWithSyli} />

                        <p className="bottom-info">
                            Syli AI v2.0 • Intelligent responses generated via Generative AI Engine.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className='result'>
                            <div className="result-title">
                                <img src={assets.Profile} alt="User" />
                                <p>{recentPrompt}</p>
                            </div>

                            <div className="result-data">
                                <div className="ai-icon-container">
                                    <span className="syli-avatar-sparkle">✦</span>
                                </div>
                                {loading ? (
                                    <div className='loader'>
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div>
                                ) : (
                                    <div className="response-box">
                                        <div className="ai-response-text" dangerouslySetInnerHTML={{ __html: resultData }}></div>
                                        <div className="response-actions">
                                            <button className={`action-btn ${copied ? 'copied' : ''}`} onClick={copyToClipboard}>
                                                {copied ? '✓ Copied!' : '📋 Copy Text'}
                                            </button>
                                            <button className={`action-btn ${liked === true ? 'active-like' : ''}`} onClick={() => setLiked(true)}>
                                                👍 Helpful
                                            </button>
                                            <button className={`action-btn ${liked === false ? 'active-dislike' : ''}`} onClick={() => setLiked(false)}>
                                                👎 Improvement Needed
                                            </button>
                                            <button className="action-btn" onClick={() => onSent(recentPrompt)}>
                                                🔄 Regenerate
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="main-bottom">
                            <div className="search-box-wrapper">
                                <div className="search-box-glow"></div>
                                <div className="search-box">
                                    <input
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        value={input}
                                        type="text"
                                        placeholder='Ask Syli anything...'
                                    />
                                    <div className="search-box-icons">
                                        <div className="mode-dropdown-wrapper" title="Change Syli AI Mode">
                                            <select
                                                value={activeMode}
                                                onChange={(e) => setActiveMode(e.target.value)}
                                                className="mode-select-dropdown"
                                            >
                                                {modes.map(m => (
                                                    <option key={m.id} value={m.id} className="mode-option">
                                                        {m.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <button className="icon-btn" title="Attach Asset">
                                            <img src={assets.gallery_icon} alt="Gallery" />
                                        </button>
                                        <button className="icon-btn" title="Voice Input">
                                            <img src={assets.mic_icon} alt="Voice" />
                                        </button>
                                        <button className={`icon-btn send-btn ${input ? 'active' : ''}`} onClick={() => onSent()} title="Send to Syli">
                                            <img src={assets.send_icon} alt="Send" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <p className="bottom-info">
                                Syli AI v2.0 • Intelligent responses generated via Generative AI Engine.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Main