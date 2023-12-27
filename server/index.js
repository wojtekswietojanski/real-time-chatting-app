const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose, connection } = require("mongoose");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const User = require("./modules/User.js");
const ws = require("ws");

const app = express();
dotenv.config();
const salt = bcrypt.genSaltSync(10);
const secretKey = "uhfuihsbalfiua";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

//rejestracja
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const createdUser = await User.create({
      username: username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(createdUser);
  } catch (error) {
    console.log(error + "błędny formularz rejestracji");
    res.status(400).json(error + "błędny formularz rejestracji");
  }
});

//logowanie
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (user) {
    var passwordOk = bcrypt.compareSync(password, user.password);
    if (passwordOk) {
      jsonWebToken.sign(
        { username, id: user._id },
        secretKey,
        (error, token) => {
          if (error) {
            throw error;
          } else {
            res.cookie("token", token).json({
              id: user.password,
              username,
            });
          }
        }
      );
    } else {
      res.status(400).json("invalid password");
    }
  } else {
    res.status(400).json("There is no account with that username");
  }
});

//wylogowywanie
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

//Sprawdzenie zalogowanie
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jsonWebToken.verify(token, secretKey, {}, (error, info) => {
      if (error) {
        console.log("lipa");
        throw error;
      }
      res.json(info);
    });
  }
});

mongoose.connect(process.env.MONGO_URL);

//tworzenie websocket
const server = app.listen(4000);
const wss = new ws.WebSocketServer({ server });
wss.on("connection", (connection, req) => {
  const cookieHeader = req.headers.cookie;

  if (cookieHeader) {
    const token = cookieHeader
      .split(";")
      .find((str) => str.trim().startsWith("token="));
    if (token) {
      const tokenValue = token.split("=")[1].trim();
      if (tokenValue) {
        jsonWebToken.verify(tokenValue, secretKey, {}, (error, info) => {
          if (error) {
            throw error;
          }
          const { username, id } = info;
          connection.username = username;
          connection.userId = id;
          [...wss.clients].forEach((client) => {
            client.send(
              JSON.stringify({
                online: [...wss.clients].map((c) => ({
                  username: c.username,
                  userId: c.userId,
                })),
              })
            );
          });
        });
      }
    } else {
      console.log("brak token w cookies");
    }
  } else {
    console.log("brak cookies w nagłówku");
  }
});
