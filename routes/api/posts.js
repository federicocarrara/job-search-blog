const express = require("express");
const router = express.Router();

// route:   api/posts
// desc:    test posts route
// access:  public
router.get("/", (req, res) => res.send("posts route"));

module.exports = router;
