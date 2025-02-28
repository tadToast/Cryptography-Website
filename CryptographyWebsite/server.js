const express = require("express");
const path = require("path");
const dbloader = require("better-sqlite3");
const fs = require("fs");

const app = express();
const db = dbloader(path.resolve(__dirname, "database.db"));
const schema = fs.readFileSync(path.resolve(__dirname, "schema.sql"), "utf-8");
db.exec(schema);


app.use(express.static(path.join(__dirname, "public")));


app.use(express.json());

// Route handlers
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/Background.html", (request, response) => {
  response.sendFile(path.join(__dirname, "public/Background.html"));
});

app.get("/keyExchange.html", (request, response) => {
  response.sendFile(path.join(__dirname, "public/keyExchange.html"));
});

app.get("/PostQ.html", (request, response) => {
  response.sendFile(path.join(__dirname, "public/PostQ.html"));
});

app.get("/publicKey.html", (request, response) => {
  response.sendFile(path.join(__dirname, "public/publicKey.html"));
});

app.post("/api/user", (req, res) => {
  const { review } = req.body;

  if (!review) {
    return res.status(400).send("Please provide a review");
  }
console.log(review)
  try {
    db.prepare("INSERT INTO users (review) VALUES (?)").run(review);
    res.send("Review submitted successfully");
  } catch (error) {
    console.error("Error inserting review:", error);
    res.status(500).send("Error submitting review");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
