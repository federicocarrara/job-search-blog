const port = process.env.PORT || 8080;

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const db = require("./config/keys").mongoURI;
const posts = require("./routes/api/posts");
const profiles = require("./routes/api/profiles");
const usersAuth = require("./routes/api/usersAuth");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport")(passport);

// connect mongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("db connected"))
  .catch(err => console.log(err));

mongoose.set("useFindAndModify", false);

app.use("/api/posts", posts);
app.use("/api/profiles", profiles);
app.use("/api/usersAuth", usersAuth);

app.listen(port, () => console.log(`server running on port ${port}`));
