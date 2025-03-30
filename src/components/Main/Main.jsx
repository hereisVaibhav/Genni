import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)


  return (
    <div className='main'>
        <div className="nav">
            <p>My Geni</p>
            <img src={assets.Profile} alt="" />
        </div>
        <div className="main-container">

            {!showResult
            ? <>
            <div className="greet">
                <p><span>Hello, Welcome</span></p>
                <p>How can I help you</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize the concept of OOPs</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Team building activities</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Tips for peace of mind</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>
            :<div className='result'>
                <div className="result-title">
                    <img src={assets.Profile} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                    ?<div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }                    
                </div>
            </div>
            } 


            
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter your prompt'/>
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
                    </div>
                </div>
                <p className="bottom-info">My Geni may give inaccurate info, so please considered to re-check it once</p>
            </div>
        </div>
    </div>
  )
}

export default Main