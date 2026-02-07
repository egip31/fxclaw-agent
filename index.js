import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 8080;
const SKILL_URL = "https://www.fxclaw.xyz/skill.md";

app.get("/", async (req, res) => {
  try {
    const r = await fetch(SKILL_URL);
    const text = await r.text();

    res.json({
      source: "fxclaw",
      fetched_at: new Date().toISOString(),
      content: text
    });
  } catch (err) {
    res.status(500).json({
      error: "failed to fetch skill.md",
      message: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`fxclaw agent running on :${PORT}`);
});
