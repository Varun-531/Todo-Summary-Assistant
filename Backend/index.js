require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const axios = require("axios");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

// Supabase DB Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Get all todos
app.get("/todos", async (req, res) => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
  res.json(result.rows);
});

app.get("/", (req, res) => {
  res.send("🚀 Backend is live!");
});

const sendSlackMessage = require("./utils/slack");
const summarizeTodos = require("./utils/summarize");

app.post("/todos", async (req, res) => {
  const { text } = req.body;
  const result = await pool.query(
    "INSERT INTO todos (text, status) VALUES ($1, $2) RETURNING *",
    [text, "pending"]
  );

  res.json(result.rows[0]);
});

app.post("/summarize", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM todos WHERE status = 'pending'"
    );

    const pendingTodos = result.rows;

    if (pendingTodos.length === 0) {
      return res.json({ message: "No pending todos to summarize." });
    }

    const summary = await summarizeTodos(pendingTodos);

    await sendSlackMessage(`🧠 *Todo Summary:*\n${summary}`);

    res.json({ summary });
  } catch (error) {
    console.error("Error summarizing todos:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update todo text
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  await pool.query("UPDATE todos SET text = $1 WHERE id = $2", [text, id]);
  res.json({ success: true });
});

// Update todo status
app.put("/todos/:id/status", async (req, res) => {
  const { id } = req.params;
  await pool.query("UPDATE todos SET status = $1 WHERE id = $2", [
    "completed",
    id,
  ]);
  res.json({ success: true });
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM todos WHERE id = $1", [id]);
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
