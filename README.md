# 🧠 AI-Powered Todo Summarizer

A full-stack application to manage and summarize your todos using AI. Users can add, update, and complete tasks — then instantly generate a smart summary of all pending todos powered by GPT-4o-mini. The summary is also sent to a Slack channel for seamless team communication.

## 🌐 Live Demo

🔗 [https://todo-summary-assistant-five.vercel.app/](https://todo-summary-assistant-five.vercel.app/)


## 🎥 YouTube Explanation Video

📺 [Watch on YouTube](https://youtu.be/yoBkUk2IcLY)
---

## 📂 Project Structure

- `Frontend/`: Contains all React components, UI logic, and API integrations.
- `Backend/`: Contains Express server, routes for todos and summarization, OpenAI integration, and Slack webhook logic.

## 📐 System Architecture

The following diagram illustrates how the system components interact:

![System Architecture](./assets/architecture-diagram.png)

---

## 🖥 Frontend Setup

📁 Navigate to the `Frontend/` directory to set up the React app.

### ⚙️ Steps to Run Locally:

```bash
cd Frontend
npm install
npm run dev
```

### 🔑 Environment Variables

Create a `.env` file in the `Frontend/` directory with the following:

```env
VITE_API_BASE_URL=https://todo-summary-assistant-1x1s.onrender.com
```

Replace the URL if your backend is deployed elsewhere.

---

## 🛠 Backend Setup

📁 Navigate to the Backend/ directory to set up the Node.js server.

### ⚙️ Steps to Run Locally:

```bash
cd Backend
npm install
npm start
```

Make sure your database (Supabase) is correctly configured before starting the server.

### 🔑 Environment Variables

Create a **`.env`** file in the `Backend/` directory with the following variables:

```env
PORT=5000
DATABASE_URL=your_supabase_postgres_connection_string
OPENAI_API_KEY=your_openai_api_key
SLACK_WEBHOOK_URL=your_slack_webhook_url
```

- `DATABASE_URL` — Get this from your Supabase project's settings.

- `OPENAI_API_KEY` — Obtain from your OpenAI API Keys.

- `SLACK_WEBHOOK_URL` — Create one in Slack under Incoming Webhooks.

## ✨ Features

- 📝 Add, edit, and delete todos
- ✅ Mark todos as completed
- 🧠 Summarize pending todos using GPT-4o-mini
- 📩 Automatically send summaries to a Slack channel
- 💅 Built with React, Tailwind CSS, and Node.js
- 🗃️ PostgreSQL (Supabase) for persistent storage

## 🔮 AI Prompt Logic

The summarization logic uses a friendly GPT-4o-mini prompt to:

- Reword todos into a concise, natural paragraph
- Avoid lists or numbering
- Focus on task importance and clarity
- Maintain a conversational tone ideal for Slack
