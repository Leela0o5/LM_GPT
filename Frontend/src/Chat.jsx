/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import "./Chat.css";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function Chat() {
  const { newChat, previousChats, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }
    if (!previousChats?.length) return;

    const content = reply.split("");
    let idx = 0;

    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(""));
      idx++;
      if (idx >= content.length) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [previousChats, reply]);

  return (
    <div className="chats">
      {newChat && <h1 className="newChatHeading">Where should we begin?</h1>}
      {Array.isArray(previousChats) &&
        previousChats.slice(0, -1).map((chat, idx) => (
          <div
            className={chat.role === "user" ? "userDiv" : "gptDiv"}
            key={idx}
          >
            {chat.role === "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {chat.content}
              </ReactMarkdown>
            )}
          </div>
        ))}
      {previousChats.length > 0 && (
        <>
          {latestReply != null ? (
            <div className="gptDiv" key={"typing"}>
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {latestReply}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="gptDiv" key={"typing"}>
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {previousChats[previousChats.length - 1].content}
              </ReactMarkdown>
            </div>
          )}
        </>
      )}
    </div>
  );
}
