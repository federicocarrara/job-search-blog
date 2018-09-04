const express = require("express");
const router = express.Router();
const UserAuth = require("../../models/UserAuth").UserAuth;
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");

// route:   api/userAuth
// desc:    test usersAuth route
// access:  public
router.get("/", (req, res) => res.send("usersAuth route"));

// route:   api/usersAuth/register
// desc:    register user
// access:  public
router.post("/register", (req, res) => {
  UserAuth.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).send("email already exist");
    } else {
      const newUser = new UserAuth({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        imageUrl: req.body.imageUrl
      });
      // hash the pwd with bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            res.send(err);
          }
          newUser.password = hash;
          // create newUser
          UserAuth.create(newUser)
            .then(user => res.send(user))
            .catch(err => res.send(err));
        });
      });
    }
  });
});

// route:   api/usersAuth/login
// desc:    login user / generate JWT token
// access:  public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  UserAuth.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).send("user not found");
    }
    bcrypt.compare(password, user.password).then(matchedPwd => {
      if (matchedPwd) {
        // Sign Token
        const payload = { id: user.id, name: user.name };
        jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
          res.json({
            token: `Bearer ${token}`
          });
        });
      } else {
        return res.status(404).send("wrong password");
      }
    });
  });
});

module.exports = router;
