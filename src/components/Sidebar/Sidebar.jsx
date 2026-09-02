import React, { useContext } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const Sidebar = () => {
    const { onSent, prevPrompts, setRecentPrompt, newChat, sidebarOpen, setSidebarOpen } = useContext(Context)

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    return (
        <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
            <div className="top">
                <div className="menu-wrapper" onClick={() => setSidebarOpen(false)} title="Close Sidebar">
                    <img className='menue' src={assets.menu_icon} alt="Menu" />
                </div>

                <div className="new-chat" onClick={() => newChat()} title="Start New Chat">
                    <img src={assets.plus_icon} alt="New Chat" />
                    <p>New Chat</p>
                </div>

                <div className="recent">
                    <p className="recent-title">Recent Chats</p>
                    <div className="recent-list">
                        {prevPrompts.map((item, index) => {
                            return (
                                <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                    <img src={assets.message_icon} alt="Message" />
                                    <p>{item.slice(0, 22)}{item.length > 22 ? '...' : ''}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry" title="Help">
                    <img src={assets.question_icon} alt="Help" />
                    <p>Help</p>
                </div>
                <div className="bottom-item recent-entry" title="Activity">
                    <img src={assets.history_icon} alt="Activity" />
                    <p>Activity</p>
                </div>
                <div className="bottom-item recent-entry" title="Settings">
                    <img src={assets.setting_icon} alt="Settings" />
                    <p>Settings</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar