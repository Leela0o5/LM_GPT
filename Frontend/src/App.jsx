
import "./App.css";
import SideBar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { MyContext } from "./MyContext";
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [previousChats, setPreviousChats] = useState([]); // Stores all prev chats of curr threads
  const [newChat, setNewChat] = useState(true);
  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    newChat,
    setNewChat,
    previousChats,
    setPreviousChats,
  };
  return (
    <div className="app">
      <MyContext.Provider value={providerValues}>
        <SideBar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  );
}

export default App;
