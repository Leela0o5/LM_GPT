import React from "react";
import "./Chat.css";
import { MyContext } from "./MyContext";
import { useContext } from "react";
export default function Chat() {
  const { newChat, previousChats } = useContext(MyContext);
  return (
    <>
      {newChat && <h1>Where should we begin?</h1>}
      <div className="chats">
        {previousChats?.map((chat, idx) => {
          return (
            <div
              className={chat.role === "user" ? "userDiv" : "gptDiv"}
              key={idx}
            >
              {chat.role === "user" ? (
                <p className="userMessage">{chat.content}</p>
              ) : (
                <p className="gptMessage">{chat.content}</p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
