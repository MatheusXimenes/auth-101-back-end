require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

app.post("/auth", (req, res) => {
  const user = {
    name: req.body.name,
  };
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_PUBLIC);
  res.json({ accessToken: token });
});

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res.sendStatus(401);
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_PUBLIC, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        req.user = user;
        next();
      }
    });
  }
}

app.listen(4000);
