const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const userController = require("./controllers/users");
const roomController = require("./controllers/rooms");
const storyController = require("./controllers/stories");
const storyPointController = require("./controllers/storyPoints");

const { PORT, UI_SERVER, SECRET_KEY } = process.env;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: UI_SERVER,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
);

app.use(
  session({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userController());
app.use("/room", roomController());
app.use("/story", storyController());
app.use("/storyPoint", storyPointController());

app.listen(`${PORT}`, () => {
  console.log(`listening on port ${PORT}`);
});
