// // server/index.js
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const { Pool } = require("pg");
// const axios = require("axios");
// const { OpenAI } = require("openai");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Supabase DB Connection
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// // Get all todos
// app.get("/todos", async (req, res) => {
//   const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
//   res.json(result.rows);
// });

// // Add new todo
// app.post("/todos", async (req, res) => {
//   const { text } = req.body;
//   const result = await pool.query(
//     "INSERT INTO todos (text) VALUES ($1) RETURNING *",
//     [text]
//   );
//   res.json(result.rows[0]);
// });

// // Update todo
// app.put("/todos/:id", async (req, res) => {
//   const { id } = req.params;
//   const { text } = req.body;
//   await pool.query("UPDATE todos SET text = $1 WHERE id = $2", [text, id]);
//   res.json({ success: true });
// });

// // Delete todo
// app.delete("/todos/:id", async (req, res) => {
//   const { id } = req.params;
//   await pool.query("DELETE FROM todos WHERE id = $1", [id]);
//   res.json({ success: true });
// });

// app.listen(5000, () => console.log("Server running on port 5000"));

// server/index.js
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

// Add new todo
app.post("/todos", async (req, res) => {
  const { text } = req.body;
  const result = await pool.query(
    "INSERT INTO todos (text, status) VALUES ($1, $2) RETURNING *",
    [text, "pending"]
  );
  res.json(result.rows[0]);
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

app.listen(5000, () => console.log("Server running on port 5000"));
