/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import { v1 as uuidv1 } from "uuid";

import React from "react";

export default function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPreviousChats,
  } = useContext(MyContext);
  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();
      // id and title
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      setAllThreads(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPreviousChats([]);
  };
  const changeThread = async (newthreadId) => {
    setCurrThreadId(newthreadId);

    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${newthreadId}`
      );
      const res = await response.json();
      console.log(res);
      setPreviousChats(res);
      setNewChat(false);
      setReply(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="sidebar">
      {/* New Chat button*/}
      <button onClick={createNewChat}>
        <img
          src="src/assets/blacklogo.png"
          alt="gpt logo"
          className="logo"
        ></img>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      {/* History*/}
      <ul className="history">
        {allThreads?.map((thread, idx) => (
          <li key={idx} onClick={(e) => changeThread(thread.threadId)}>
            {thread.title}
          </li>
        ))}
      </ul>
      {/* sign */}
      <div className="sign">
        <p>By Leela ML &hearts;</p>
      </div>
    </section>
  );
}
