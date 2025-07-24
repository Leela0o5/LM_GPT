import React from "react";
import "./Chat.css";
import { MyContext } from "./MyContext";
import { useContext } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
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
                <ReactMarkdown rehypePlugins={rehypeHighlight}>
                  {chat.content}
                </ReactMarkdown>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
