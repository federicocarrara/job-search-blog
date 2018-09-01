const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const posts = require("./routes/api/posts");
const profiles = require("./routes/api/profiles");
const usersAuth = require("./routes/api/usersAuth");

const app = express();

// connect mongoDB
mongoose
  .connect(db)
  .then(() => console.log("db connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("test"));

app.use("/api/posts", posts);
app.use("/api/profiles", profiles);
app.use("/api/usersAuth", usersAuth);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server running on port ${port}`));
