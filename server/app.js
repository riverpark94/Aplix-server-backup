const express = require("express");
require("./models");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require("express-session");
const cors = require("cors");
const Route = require("./routes/index")

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.listen(5000, () => {
    console.log("5000 port success")
})

app.use(
  session({
    secret: "@applixzzang",
    resave: false,
    saveUninitialized: true,
    cookie: {
      signed: true,
      httpOnly: true,
      maxAge: 3600,
      sameSite: "none"
    }
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000", "http://applix-client.s3-website.ap-northeast-2.amazonaws.com"], // 수정해야함.
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })  
);
// 분기
app.use(Route);

module.exports = app; 