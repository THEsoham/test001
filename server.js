const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

// serve frontend
app.use(express.static("public"));

let scores = {}; // store scores by player name

io.on("connection", socket => {
  console.log("✅ A player connected:", socket.id);

  socket.on("joinGame", name => {
    scores[name] = 0;
    io.emit("scoresUpdate", scores);
  });

  socket.on("correctAnswer", name => {
    if (scores[name] !== undefined) {
      scores[name]++;
      io.emit("scoresUpdate", scores);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ A player disconnected");
  });
});

http.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
