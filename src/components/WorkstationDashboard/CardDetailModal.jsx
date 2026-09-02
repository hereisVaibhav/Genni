import React, { useState } from 'react'
import './CardDetailModal.css'

const CardDetailModal = ({ item, type, onClose, onDiscussWithSyli }) => {
    if (!item) return null

    const [activeTab, setActiveTab] = useState('Summary')
    const isMarket = type === 'stock' || type === 'crypto'

    // High-Resolution Bloomberg-Style Terminal Chart Canvas (Matching Image 3)
    const renderTerminalChart = () => {
        const width = 600
        const height = 240
        const points = item?.sparkline?.length 
            ? item.sparkline 
            : [12, 14, 13, 16, 15, 22, 28, 25, 34, 32, 42, 38, 45]

        const min = Math.min(...points)
        const max = Math.max(...points)
        const range = max - min || 1

        const coords = points.map((p, idx) => {
            const x = (idx / (points.length - 1)) * (width - 40) + 20
            const y = height - ((p - min) / range) * (height - 60) - 30
            return { x, y, val: p }
        })

        const pathD = coords.reduce((acc, curr, i) => {
            return i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`
        }, '')

        const areaD = `${pathD} L ${width - 20} ${height - 20} L 20 ${height - 20} Z`

        return (
            <div className="terminal-chart-wrapper">
                <div className="chart-controls-bar">
                    <span className="scale-label">Logarithmic Scale <input type="checkbox" defaultChecked /></span>
                    <span className="range-pills">
                        <span className="pill active">1Y</span>
                        <span className="pill">3Y</span>
                        <span className="pill">5Y</span>
                        <span className="pill">MAX</span>
                    </span>
                </div>

                <svg width="100%" height="240" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="terminalArea" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.05" />
                        </linearGradient>
                    </defs>

                    {/* Gridlines matching Bloomberg Terminal */}
                    {[40, 80, 120, 160, 200].map((yVal, i) => (
                        <line key={i} x1="20" y1={yVal} x2={width - 20} y2={yVal} stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="2 2" />
                    ))}

                    <path d={areaD} fill="url(#terminalArea)" />
                    <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="2.5" />

                    {coords.map((pt, idx) => (
                        <circle key={idx} cx={pt.x} cy={pt.y} r="3" fill="#ffffff" stroke="#38bdf8" strokeWidth="1.5" />
                    ))}
                </svg>

                <div className="terminal-x-axis">
                    <span>2018Y</span>
                    <span>2019Y</span>
                    <span>2020Y</span>
                    <span>2021Y</span>
                    <span>2022Y</span>
                    <span>TTM</span>
                </div>
            </div>
        )
    }

    return (
        <div className="bloomberg-terminal-overlay" onClick={onClose}>
            <div className="bloomberg-terminal-card" onClick={(e) => e.stopPropagation()}>
                {/* Header Bar matching Image 3 */}
                <div className="terminal-header-bar">
                    <div className="terminal-asset-title">
                        <div className="asset-flag-box">🇺🇸</div>
                        <div className="asset-title-text">
                            <h1>{item.name ? item.name.toUpperCase() : 'ASSET TERMINAL'}</h1>
                            <span className="asset-sub-code">{item.symbol || 'US'} • UNITED STATES COMPOSITE</span>
                        </div>
                    </div>

                    <div className="terminal-key-ratios">
                        <div className="ratio-item">
                            <span className="ratio-val">0.83</span>
                            <span className="ratio-lbl">EPS DIL.</span>
                        </div>
                        <div className="ratio-item">
                            <span className="ratio-val">52.18</span>
                            <span className="ratio-lbl">P/E</span>
                        </div>
                        <div className="ratio-item">
                            <span className="ratio-val">21.07B</span>
                            <span className="ratio-lbl">MARKET CAP</span>
                        </div>
                        <div className="ratio-item">
                            <span className="ratio-val">1.19%</span>
                            <span className="ratio-lbl">DIV. YIELD</span>
                        </div>

                        <button className="terminal-close-x" onClick={onClose}>✕</button>
                    </div>
                </div>

                {/* Big Price Ticker Row */}
                <div className="terminal-price-row">
                    <span className="big-terminal-price">{item.price ? `$${item.price}` : '$43.52'}</span>
                    <span className="price-curr">USD</span>
                    <span className={`price-delta ${item.isPositive ? 'positive' : 'negative'}`}>
                        {item.change || '-0.50 (-1.14%)'}
                    </span>
                </div>

                {/* Navigation Tabs matching Image 3 */}
                <div className="terminal-tabs">
                    {['Summary', 'Financials', 'Ratios', 'Transcripts', 'Classic View'].map(tab => (
                        <button 
                            key={tab} 
                            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Main Bloomberg Terminal Grid Body */}
                <div className="terminal-body-grid">
                    {/* Left Financial Metrics Table matching Image 3 */}
                    <div className="terminal-metrics-table">
                        <div className="table-row">
                            <span>Next Earnings</span>
                            <strong>February 13</strong>
                        </div>
                        <div className="table-row">
                            <span>Ex-Dividend Date</span>
                            <strong>November 9</strong>
                        </div>
                        <div className="table-row">
                            <span>Dividend Date</span>
                            <strong>December 11</strong>
                        </div>
                        <div className="table-divider"></div>
                        <div className="table-row">
                            <span>Held by Insiders</span>
                            <strong>42.58%</strong>
                        </div>
                        <div className="table-row">
                            <span>Held by Institutions</span>
                            <strong>52.05%</strong>
                        </div>
                        <div className="table-row">
                            <span>Short % of Float</span>
                            <strong>1.75%</strong>
                        </div>
                        <div className="table-divider"></div>
                        <div className="table-row">
                            <span>YTD Yield</span>
                            <strong className="positive">22.97%</strong>
                        </div>
                        <div className="table-row">
                            <span>3Y Yield</span>
                            <strong className="positive">20.36%</strong>
                        </div>
                    </div>

                    {/* Right Interactive Chart matching Image 3 */}
                    <div className="terminal-chart-panel">
                        {renderTerminalChart()}
                    </div>
                </div>

                {/* Bottom Financial Table matching Image 3 */}
                <div className="terminal-financial-rows">
                    <div className="fin-header-row">
                        <span>Metric (USD)</span>
                        <span>2018Y</span>
                        <span>2019Y</span>
                        <span>2020Y</span>
                        <span>2021Y</span>
                        <span>2022Y</span>
                        <span>TTM</span>
                    </div>
                    <div className="fin-data-row">
                        <span>Revenue per Share</span>
                        <span>2.87</span>
                        <span>3.20</span>
                        <span>3.71</span>
                        <span>4.40</span>
                        <span>4.93</span>
                        <span>6.06</span>
                    </div>
                    <div className="fin-data-row">
                        <span>Basic EPS, GAAP</span>
                        <span>0.28</span>
                        <span>0.31</span>
                        <span>0.34</span>
                        <span>0.41</span>
                        <span>0.53</span>
                        <span>0.83</span>
                    </div>
                    <div className="fin-data-row">
                        <span>Free Cash Flow per Share</span>
                        <span>0.29</span>
                        <span>0.34</span>
                        <span>0.43</span>
                        <span>0.57</span>
                        <span>0.68</span>
                        <span>0.88</span>
                    </div>
                </div>

                {/* AI Recommendation Banner */}
                <div className="terminal-ai-recommendation">
                    <div className="rec-header">
                        <span>🧠 SYLI AI TERMINAL RECOMMENDATION</span>
                        <span className="rec-badge positive">STRONG ACCUMULATE</span>
                    </div>
                    <p>
                        "Consistent free cash flow growth (CAGR +18.4%) and stable institutional holding (52.05%) indicate resilient market position. Logarithmic trend line signals positive long-term channel."
                    </p>
                </div>

                {/* Launch Chat Action */}
                <div className="terminal-footer-action">
                    <button 
                        className="terminal-chat-btn"
                        onClick={() => onDiscussWithSyli(isMarket ? `Provide a full financial ratio analysis and valuation breakdown for ${item.name || 'this asset'} (${item.symbol || 'US'}).` : `Provide a complete summary for: "${item.title}".`)}
                    >
                        ⚡ LAUNCH FULL SYLI CHAT SESSION →
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardDetailModal
