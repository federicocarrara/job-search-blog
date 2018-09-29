const express = require("express");
const router = express.Router();
const UserAuth = require("../../models/UserAuth");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// route:   POST api/usersAuth/register
// desc:    register user
// access:  public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).send(errors);
  }
  UserAuth.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "email already exist";
      return res.status(400).send(errors);
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
            return res.send(err);
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

// route:   POST api/usersAuth/login
// desc:    login user / generate JWT token
// access:  public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).send(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // findone({email}) because ES6 email:email same of email
  UserAuth.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).send("user not found");
    }
    bcrypt.compare(password, user.password).then(matchedPwd => {
      if (matchedPwd) {
        // Sign Token
        const payload = { id: user.id };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              return res.send(err);
            }
            res.send({
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        return res.status(400).send("wrong password");
      }
    });
  });
});

// route:   GET api/usersAuth/current
// desc:    get current user name
// access:  private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({ id: req.user.name });
  }
);

module.exports = router;
