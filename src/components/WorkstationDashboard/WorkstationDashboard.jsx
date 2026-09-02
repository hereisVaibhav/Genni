import React, { useEffect, useState } from 'react'
import { 
    fetchLiveCryptoData, 
    fetchLiveNews, 
    fetchLiveStocks, 
    fetchYouTubeTrends, 
    fetchAnimeRadar, 
    fetchMedicineData, 
    fetchAutomotiveData, 
    fetchGamingData 
} from '../../services/dashboardService'
import CardDetailModal from './CardDetailModal'
import CustomizeWidgetsModal from './CustomizeWidgetsModal'
import './WorkstationDashboard.css'

const WorkstationDashboard = ({ onDiscussWithSyli }) => {
    const [dataFeeds, setDataFeeds] = useState({})
    const [loadingData, setLoadingData] = useState(true)

    const [selectedItem, setSelectedItem] = useState(null)
    const [selectedType, setSelectedType] = useState(null)
    const [showCustomize, setShowCustomize] = useState(false)

    // User preference widget visibility state (all categories customizable)
    const [activeWidgets, setActiveWidgets] = useState(() => {
        const saved = localStorage.getItem('syli_workstation_widgets')
        return saved ? JSON.parse(saved) : {
            stocks: true,
            crypto: true,
            news: true,
            briefing: true,
            youtube: true,
            anime: true,
            medicine: true,
            cars: true,
            gaming: true
        }
    })

    useEffect(() => {
        let isMounted = true
        const loadDashboardData = async () => {
            setLoadingData(true)
            const [
                cryptoData, newsData, stockData, ytData, animeData, medData, carData, gameData
            ] = await Promise.all([
                fetchLiveCryptoData(),
                fetchLiveNews(),
                fetchLiveStocks(),
                fetchYouTubeTrends(),
                fetchAnimeRadar(),
                fetchMedicineData(),
                fetchAutomotiveData(),
                fetchGamingData()
            ])
            if (isMounted) {
                setDataFeeds({
                    stocks: stockData[0] || null,
                    crypto: cryptoData[0] || null,
                    news: newsData[0] || null,
                    youtube: ytData[0] || null,
                    anime: animeData[0] || null,
                    medicine: medData[0] || null,
                    cars: carData[0] || null,
                    gaming: gameData[0] || null
                })
                setLoadingData(false)
            }
        }

        loadDashboardData()
        const interval = setInterval(loadDashboardData, 45000)

        return () => {
            isMounted = false
            clearInterval(interval)
        }
    }, [])

    const toggleWidget = (widgetId) => {
        const updated = { ...activeWidgets, [widgetId]: !activeWidgets[widgetId] }
        setActiveWidgets(updated)
        localStorage.setItem('syli_workstation_widgets', JSON.stringify(updated))
    }

    const handleItemClick = (item, type) => {
        setSelectedItem(item)
        setSelectedType(type)
    }

    return (
        <div className="pure-hud-visual-array">
            {/* Header Telemetry bar */}
            <div className="hud-floating-header">
                <div className="hud-brand-line">
                    <span className="floating-pulse-beacon"></span>
                    <span className="hud-system-title">DYNAMIC HUD TELEMETRY ARRAY</span>
                    <span className="hud-tag-pill">LIVE FREQUENCY STREAM</span>
                </div>

                <button className="floating-customize-btn" onClick={() => setShowCustomize(true)}>
                    ⚙️ CUSTOMIZE FEEDS ({Object.values(activeWidgets).filter(Boolean).length} ACTIVE)
                </button>
            </div>

            {/* DYNAMIC HIGH-TECH ANIMATED HUD VISUAL GRID */}
            <div className="floating-visual-grid">
                
                {/* 1. STOCK MARKET SINE WAVE & 3D PILLARS */}
                {activeWidgets.stocks && dataFeeds.stocks && (
                    <div 
                        className="hud-floating-visual-item"
                        onClick={() => handleItemClick(dataFeeds.stocks, 'stock')}
                        title="Click for full Bloomberg Terminal visual view"
                    >
                        <div className="visual-meta-header">
                            <span className="visual-code">STOCK_SCOPE // {dataFeeds.stocks.symbol}</span>
                            <span className="visual-change positive">{dataFeeds.stocks.change}</span>
                        </div>

                        <div className="visual-val-display">
                            <span className="visual-name">{dataFeeds.stocks.name}</span>
                            <span className="visual-price">${dataFeeds.stocks.price}</span>
                        </div>

                        <div className="live-wave-scope-box">
                            <svg width="100%" height="70" viewBox="0 0 280 70" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="waveGlow" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
                                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.0" />
                                    </linearGradient>
                                </defs>
                                <path className="animated-wave-path" d="M 0 35 Q 35 5, 70 35 T 140 35 T 210 35 T 280 35 L 280 70 L 0 70 Z" fill="url(#waveGlow)" />
                                <path className="animated-wave-stroke" d="M 0 35 Q 35 5, 70 35 T 140 35 T 210 35 T 280 35" fill="none" stroke="#38bdf8" strokeWidth="3" />
                            </svg>
                        </div>

                        <div className="animated-3d-pillars">
                            <div className="pillar p1"></div>
                            <div className="pillar p2"></div>
                            <div className="pillar p3"></div>
                            <div className="pillar p4"></div>
                            <div className="pillar p5"></div>
                            <div className="pillar p6"></div>
                            <div className="pillar p7"></div>
                        </div>

                        <span className="floating-hover-hint">BLOOMBERG TERMINAL VIEW →</span>
                    </div>
                )}

                {/* 2. CRYPTO ROTATING DUAL HUD GAUGE RINGS */}
                {activeWidgets.crypto && dataFeeds.crypto && (
                    <div 
                        className="hud-floating-visual-item"
                        onClick={() => handleItemClick(dataFeeds.crypto, 'crypto')}
                        title="Click for full Terminal visual view"
                    >
                        <div className="visual-meta-header">
                            <span className="visual-code">ROTATING_GAUGE // {dataFeeds.crypto.symbol}</span>
                            <span className="visual-change positive">{dataFeeds.crypto.change}</span>
                        </div>

                        <div className="spinning-ring-hud-wrapper">
                            <div className="outer-hud-spinner"></div>
                            <div className="inner-hud-spinner"></div>
                            <div className="gauge-center-val">
                                <span className="big-gauge-num">87.5</span>
                                <span className="gauge-label">BULLISH</span>
                            </div>
                        </div>

                        <div className="visual-val-display text-center">
                            <span className="visual-name">{dataFeeds.crypto.name} (${dataFeeds.crypto.symbol})</span>
                            <span className="visual-price">${dataFeeds.crypto.price}</span>
                        </div>

                        <span className="floating-hover-hint">FULL TERMINAL VIEW →</span>
                    </div>
                )}

                {/* 3. YOUTUBE TRENDING MEDIA FEED */}
                {activeWidgets.youtube && dataFeeds.youtube && (
                    <div 
                        className="hud-floating-visual-item"
                        onClick={() => handleItemClick(dataFeeds.youtube, 'youtube')}
                        title="Click to view full video analysis & recommendations"
                    >
                        <div className="visual-meta-header">
                            <span className="visual-code">YT_TRENDS // MEDIA</span>
                            <span className="visual-tag">{dataFeeds.youtube.views}</span>
                        </div>

                        <div className="aurora-liquid-blob-container">
                            <div className="aurora-fluid-blob yt-blob">
                                <div className="blob-inner-core">
                                    <span className="blob-percentage">▶️</span>
                                    <span className="blob-label">{dataFeeds.youtube.channel}</span>
                                </div>
                            </div>
                        </div>

                        <span className="aurora-news-title">{dataFeeds.youtube.title}</span>
                        <span className="floating-hover-hint">VIEW MEDIA ANALYSIS →</span>
                    </div>
                )}

                {/* 4. ANIME & MANGA RADAR */}
                {activeWidgets.anime && dataFeeds.anime && (
                    <div 
                        className="hud-floating-visual-item"
                        onClick={() => handleItemClick(dataFeeds.anime, 'anime')}
                        title="Click to view full anime details"
                    >
                        <div className="visual-meta-header">
                            <span className="visual-code">ANIME_RADAR // AIRING</span>
                            <span className="visual-tag">{dataFeeds.anime.rating}</span>
                        </div>

                        <div className="spinning-ring-hud-wrapper">
                            <div className="outer-hud-spinner anime-spinner"></div>
                            <div className="gauge-center-val">
                                <span className="big-gauge-num">⛩️</span>
                                <span className="gauge-label">AIRING</span>
                            </div>
                        </div>

                        <span className="aurora-news-title">{dataFeeds.anime.title}</span>
                        <span className="floating-hover-hint">VIEW ANIME SPECS →</span>
                    </div>
                )}

                {/* 5. MEDICINE & HEALTH INSIGHTS */}
                {activeWidgets.medicine && dataFeeds.medicine && (
                    <div 
                        className="hud-floating-visual-item"
                        onClick={() => handleItemClick(dataFeeds.medicine, 'medicine')}
                        title="Click for medical research summary"
                    >
                        <div className="visual-meta-header">
                            <span className="visual-code">MEDICINE // PHARMA</span>
                            <span className="visual-tag">CLINICAL</span>
                        </div>

                        <div className="live-wave-scope-box">
                            <svg width="100%" height="60" viewBox="0 0 280 60" preserveAspectRatio="none">
                                <path className="animated-wave-stroke" d="M 0 30 Q 30 10, 60 50 T 120 20 T 180 40 T 240 30" fill="none" stroke="#4ade80" strokeWidth="3" />
                            </svg>
                        </div>

                        <span className="aurora-news-title">{dataFeeds.medicine.title}</span>
                        <span className="floating-hover-hint">VIEW MEDICAL INSIGHTS →</span>
                    </div>
                )}

                {/* 6. SUPERCARS & AUTOMOTIVE HUB */}
                {activeWidgets.cars && dataFeeds.cars && (
                    <div 
                        className="hud-floating-visual-item"
                        onClick={() => handleItemClick(dataFeeds.cars, 'cars')}
                        title="Click for full supercar specs"
                    >
                        <div className="visual-meta-header">
                            <span className="visual-code">AUTO_HUB // SUPERCARS</span>
                            <span className="visual-tag">{dataFeeds.cars.specs}</span>
                        </div>

                        <div className="prism-3d-wrapper">
                            <div className="wireframe-prism-cube auto-cube">
                                <div className="prism-face front"></div>
                                <div className="prism-face back"></div>
                                <div className="prism-face right"></div>
                                <div className="prism-face left"></div>
                            </div>
                        </div>

                        <span className="aurora-news-title">{dataFeeds.cars.title}</span>
                        <span className="floating-hover-hint">VIEW CAR SPECS →</span>
                    </div>
                )}

                {/* 7. GAMING & ESPORTS CENTER */}
                {activeWidgets.gaming && dataFeeds.gaming && (
                    <div 
                        className="hud-floating-visual-item"
                        onClick={() => handleItemClick(dataFeeds.gaming, 'gaming')}
                        title="Click for gaming breakdown"
                    >
                        <div className="visual-meta-header">
                            <span className="visual-code">GAMING // UNREAL5</span>
                            <span className="visual-tag">{dataFeeds.gaming.rating}</span>
                        </div>

                        <div className="aurora-liquid-blob-container">
                            <div className="aurora-fluid-blob gaming-blob">
                                <div className="blob-inner-core">
                                    <span className="blob-percentage">🎮</span>
                                    <span className="blob-label">4K 60FPS</span>
                                </div>
                            </div>
                        </div>

                        <span className="aurora-news-title">{dataFeeds.gaming.title}</span>
                        <span className="floating-hover-hint">VIEW GAMING RECS →</span>
                    </div>
                )}

                {/* 8. TECH & GLOBAL NEWS */}
                {activeWidgets.news && dataFeeds.news && (
                    <div 
                        className="hud-floating-visual-item"
                        onClick={() => handleItemClick(dataFeeds.news, 'news')}
                        title="Click to view full story analysis"
                    >
                        <div className="visual-meta-header">
                            <span className="visual-code">GLOBAL_NEWS // LIVE</span>
                            <span className="visual-tag">{dataFeeds.news.category}</span>
                        </div>

                        <div className="floating-world-map-visual">
                            <div className="map-pin pin-1"></div>
                            <div className="map-pin pin-2"></div>
                            <span className="map-headline">{dataFeeds.news.title}</span>
                        </div>

                        <span className="floating-hover-hint">FULL ANALYSIS & RECS →</span>
                    </div>
                )}

                {/* 9. AI DAILY BRIEFING */}
                {activeWidgets.briefing && (
                    <div 
                        className="hud-floating-visual-item"
                        onClick={() => onDiscussWithSyli("Generate an executive briefing on current tech and market stats.")}
                        title="Click to launch AI Chat Briefing"
                    >
                        <div className="visual-meta-header">
                            <span className="visual-code">CRYSTAL_PRISM // 3D_NEURAL</span>
                            <span className="visual-tag">94% SYNC</span>
                        </div>

                        <div className="prism-3d-wrapper">
                            <div className="wireframe-prism-cube">
                                <div className="prism-face front"></div>
                                <div className="prism-face back"></div>
                                <div className="prism-face right"></div>
                                <div className="prism-face left"></div>
                            </div>
                        </div>

                        <span className="prism-briefing-lbl">AI EXECUTIVE BRIEFING</span>
                        <span className="floating-hover-hint">LAUNCH CHAT BRIEFING →</span>
                    </div>
                )}

            </div>

            {/* Bloomberg-Style Full Terminal View Window Modal */}
            {selectedItem && (
                <CardDetailModal 
                    item={selectedItem} 
                    type={selectedType} 
                    onClose={() => setSelectedItem(null)}
                    onDiscussWithSyli={(promptText) => {
                        setSelectedItem(null)
                        onDiscussWithSyli(promptText)
                    }}
                />
            )}

            {/* Customize Modal */}
            {showCustomize && (
                <CustomizeWidgetsModal 
                    activeWidgets={activeWidgets}
                    onToggleWidget={toggleWidget}
                    onClose={() => setShowCustomize(false)}
                />
            )}
        </div>
    )
}

export default WorkstationDashboard
