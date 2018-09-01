const express = require("express");
const router = express.Router();

// route:   api/userAuth
// desc:    test usersAuth route
// access:  public
router.get("/", (req, res) => res.send("usersAuth route"));

module.exports = router;
