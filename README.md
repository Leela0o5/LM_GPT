# LM_GPT

LM_GPT is a full-stack AI chat application built with React and Node.js. It uses the OpenAI Chat Completion API to generate intelligent responses based on user input. The application supports multiple chat threads, shows typing animations during responses, and formats content using markdown and code highlighting.

## Tech Stack

- Frontend: React, Context API, React Markdown, Rehype Highlight
- Backend: Node.js, Express
- API Integration: OpenAI Chat Completion API

## Features

- Send messages and receive AI-generated replies
- Create and switch between chat threads
- Typing animation for responses
- Markdown formatting and syntax-highlighted code blocks

## Setup Instructions

```bash
git clone https://github.com/Leela0o5/LM_GPT.git
cd LM_GPT

# Backend
cd backend
npm install
echo "OPENAI_API_KEY=your_api_key_here" > .env
node server.js

# Frontend
cd ../frontend
npm install
npm start
