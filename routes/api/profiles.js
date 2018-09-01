const express = require("express");
const router = express.Router();

// route:   api/profiles
// desc:    test profiles route
// access:  public
router.get("/", (req, res) => res.send("profiles route"));

module.exports = router;
