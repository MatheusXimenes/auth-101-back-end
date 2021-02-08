require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

const posts = [
  {
    userName: "Matheus",
    post: "Post1",
  },
  {
    userName: "Ximenes",
    post: "Post2",
  },
];

app.get("/post", authenticateToken, (req, res) => {
  res.json(posts.filter((p) => p.userName === req.user.name));
});

app.listen(3000);
