import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const[loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");

    const delayPara = (index,nextWord) =>{
        setTimeout(function () {
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    const [activeMode, setActiveMode] = useState("smart");
    const [theme, setTheme] = useState("cyber"); // 'cyber' | 'synthwave' | 'obsidian' | 'matrix'
    const [showIntro, setShowIntro] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        
        let promptToSend = prompt !== undefined ? prompt : input;
        
        // Enhance prompt with selected Syli Mode context
        let modePrefix = "";
        if (activeMode === "creative") {
            modePrefix = "[Mode: Creative & Imaginative] ";
        } else if (activeMode === "code") {
            modePrefix = "[Mode: Developer & Code Genius] ";
        } else if (activeMode === "deep") {
            modePrefix = "[Mode: Deep Analytical Breakdown] ";
        }
        
        let finalPrompt = modePrefix ? `${modePrefix}${promptToSend}` : promptToSend;
        
        let response;
        if (prompt !== undefined) {
            setRecentPrompt(prompt)
            response = await run(finalPrompt);
        } else {
            setPrevPrompts(prev => [...prev, input])
            setRecentPrompt(input)
            response = await run(finalPrompt)
        }
        
        let responseArray = response.split("**");
        let newResponse = "";
        for(let i=0; i < responseArray.length; i++){
            if (i === 0 || i%2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "</br>" + "</br>" +"</b>" +"<b>"+responseArray[i]+"</b>"     
            }
        }
        let newResponse2 = newResponse.split("**" && '*').join('<b>' + '</b>')
        let newResponseArray = newResponse2.split('##' && '#');
        
        for(let i=0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + ' ');
        }
        setLoading(false)
        setInput("")
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        activeMode,
        setActiveMode,
        theme,
        setTheme,
        showIntro,
        setShowIntro,
        sidebarOpen,
        setSidebarOpen
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )

}

export default ContextProvider