import "./Sidebar.css";

import React from "react";

export default function Sidebar() {
  return (
    <section className="sidebar">
      {/* New Chat button*/}
      <button>
        <img
          src="src/assets/blacklogo.png"
          alt="gpt logo"
          className="logo"
        ></img>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      {/* History*/}
      <ul className="history">
        <li>history1</li>
        <li>History2</li>
        <li>History3</li>
      </ul>
      {/* sign */}
      <div className="sign">
        <p>By Leela ML &hearts;</p>
      </div>
    </section>
  );
}
