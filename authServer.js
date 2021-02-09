require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

//TODO: Move that Concept to a Database
let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) {
    return res.sendStatus(401);
  }

  if (!refreshToken.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, progress.env.ACCESS_TOKEN_REFRESH, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const accessToken = GenerateJWTToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

app.post("/login", (req, res) => {
  const user = {
    name: req.body.name,
  };
  const token = GenerateJWTToken(user, false);
  const refreshToken = GenerateJWTToken(user, true);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: token, refreshToken: refreshToken });
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((t) => t !== req.body.token);
});

const GenerateJWTToken = (user, useRefresh) => {
  return jwt.sign(
    user,
    useRefresh
      ? process.env.ACCESS_TOKEN_REFRESH
      : process.env.ACCESS_TOKEN_PUBLIC,
    !useRefresh
      ? {
          expiresIn: "30s",
        }
      : {}
  );
};

app.listen(4000);
