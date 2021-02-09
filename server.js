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

app.get("/post", AuthenticateToken, (req, res) => {
  res.json(posts.filter((p) => p.userName === req.user.name));
});

function AuthenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_PUBLIC, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

app.listen(3000);
