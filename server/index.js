const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const User = require("./modules/User.js");

const app = express();
dotenv.config();
const salt = bcrypt.genSaltSync(10);
const secretKey = "uhfuihsbalfiua";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

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

mongoose.connect(process.env.MONGO_URL);

app.listen(4000);
