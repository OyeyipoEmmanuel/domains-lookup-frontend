// server.js
import express from "express";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// For serving the React build later
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------------------
// API: GET /api/domains
// ----------------------
app.get("/api/domains", (req, res) => {
  const letters = req.query.letters;
  if (!letters || !["1", "2", "3"].includes(letters)) {
    return res
      .status(400)
      .json({ error: "Invalid letters parameter. Only 1, 2, or 3 allowed." });
  }

  const file = path.join(__dirname, "data", `available_${letters}.json`);

  try {
    if (!fs.existsSync(file)) {
      return res
        .status(404)
        .json({ error: `${file} not found. Run lookup.js first.` });
    }

    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read domain file." });
  }
});

// ----------------------
// API: GET /api/run
// ----------------------
app.get("/api/run", (req, res) => {
  const letters = req.query.letters;
  const tlds = req.query.tlds || ".com";

  if (!letters || !["1", "2", "3"].includes(letters)) {
    return res
      .status(400)
      .json({ error: "Invalid letters parameter. Only 1, 2, or 3 allowed." });
  }

  const command = `node lookup.js ${letters} ${tlds}`;

  const process = exec(command);
  let output = "";

  process.stdout.on("data", (data) => {
    output += data;
  });

  process.stderr.on("data", (data) => {
    console.error(data);
  });

  process.on("close", (code) => {
    if (code === 0) {
      res.json({ message: "Lookup completed", log: output });
    } else {
      res.status(500).json({ error: "lookup.js failed", log: output });
    }
  });
});

// ----------------------
// FRONTEND: Serve React build
// ----------------------
app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

// ----------------------
// START SERVER
// ----------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
