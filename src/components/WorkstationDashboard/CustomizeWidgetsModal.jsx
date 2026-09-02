import React from 'react'
import './CustomizeWidgetsModal.css'

const CustomizeWidgetsModal = ({ activeWidgets, onToggleWidget, onClose }) => {
    const availableWidgets = [
        { id: 'stocks', label: '📈 Stock Market Tickers', desc: 'S&P 500, NVDA, AAPL, MSFT, TSLA' },
        { id: 'crypto', label: '🪙 Crypto Market Feed', desc: 'Bitcoin, Ethereum, Solana live 24h rates' },
        { id: 'news', label: '📰 Tech & Global News', desc: 'Top live developments in AI & tech' },
        { id: 'briefing', label: '🧠 AI Daily Briefing', desc: 'Executive current affairs summary' },
        { id: 'youtube', label: '▶️ YouTube & Video Trends', desc: 'Trending tech videos, channels & viral content' },
        { id: 'anime', label: '⛩️ Anime & Manga Radar', desc: 'Top airing anime, seasonal ratings & manga releases' },
        { id: 'medicine', label: '💊 Medicine & Health Insights', desc: 'Pharma research, medical news & clinical stats' },
        { id: 'cars', label: '🏎️ Supercars & Automotive Hub', desc: 'EV breakthroughs, supercar specs & auto trends' },
        { id: 'gaming', label: '🎮 Gaming & Esports Center', desc: 'Game launches, patch updates & tournament stats' },
        { id: 'productivity', label: '⚡ Workstation Quick Stats', desc: 'System status & productivity metrics' }
    ]

    return (
        <div className="customize-modal-overlay" onClick={onClose}>
            <div className="customize-modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="customize-modal-header">
                    <h3>⚙️ Customize Workstation Layout</h3>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <p className="customize-subtitle">
                    Select the live telemetry feeds & topics you want active on your command workstation:
                </p>

                <div className="widget-toggle-list">
                    {availableWidgets.map(widget => {
                        const isEnabled = activeWidgets[widget.id]
                        return (
                            <div 
                                key={widget.id} 
                                className={`widget-toggle-item ${isEnabled ? 'enabled' : ''}`}
                                onClick={() => onToggleWidget(widget.id)}
                            >
                                <div className="widget-info">
                                    <span className="widget-label">{widget.label}</span>
                                    <span className="widget-desc">{widget.desc}</span>
                                </div>
                                <div className={`toggle-switch ${isEnabled ? 'on' : 'off'}`}>
                                    <span className="switch-handle"></span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="customize-modal-footer">
                    <button className="done-btn" onClick={onClose}>
                        ✓ Save Preferences
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CustomizeWidgetsModal
