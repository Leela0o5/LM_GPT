/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useState } from "react";
import "./ChatWindow.css";
import Chat from "./Chat";
import { MyContext } from "./MyContext";
import { ScaleLoader } from "react-spinners";

export default function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    previousChats,
    setPreviousChats,
    setNewChat,
  } = useContext(MyContext);
  const [loading, SetLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const getReply = async () => {
    SetLoading(true);
    setNewChat(false);
    console.log("message: ", prompt, "threadId : ", currThreadId);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };

    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      const res = await response.json();
      console.log(res);
      setReply(res.reply);
    } catch (err) {
      console.log(err);
    }
    SetLoading(false);
  };

  // Append new chat to previous chat
  useEffect(() => {
    if (prompt && reply) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);
    }

    setPrompt("");
  }, [reply]);

  return (
    <div className="chatWindow">
      {/* Navbar */}
      <div className="navbar">
        <span>
          LM-GPT <i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="userIconDiv">
          <span className="userIcon" onClick={(e) => setIsOpen(!isOpen)}>
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">
            <i className="fa-solid fa-cloud-arrow-up"></i>&nbsp;&nbsp;Upgrade
            Plan
          </div>
          <div className="dropDownItem">
            <i className="fa-solid fa-gear"></i>&nbsp;&nbsp;Settings
          </div>
          <div className="dropDownItem">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            &nbsp;&nbsp;Logout
          </div>
        </div>
      )}

      {/* Chat area */}
      <Chat />
      <ScaleLoader color="white" loading={loading}></ScaleLoader>
      {/* Input area */}
      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
          ></input>
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">LM-GPT can make mistakes.</p>
      </div>
    </div>
  );
}
