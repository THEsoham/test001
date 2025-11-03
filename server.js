// Import dependencies
const express = require("express");
const path = require("path");

const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Use Render’s assigned port (or 3000 locally)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
