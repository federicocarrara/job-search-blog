const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Profile = require("../../models/Profile");
const UserAuth = require("../../models/UserAuth");
const validateProfileInput = require("../../validation/profile");

// route:   api/profiles
// desc:    get current user profile
// access:  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user._id })
      .populate("user")
      .then(profile => {
        if (!profile) {
          errors.noProfile = "there is no user profile";
          return res.status(404).send(errors);
        }
        return res.send(profile);
      })
      .catch(err => res.status(404).send(err));
  }
);

// route:   api/profiles/handle/:handle
// desc:    get profile by handle
// access:  public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "imageUrl"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "no handle matched";
        return res.status(404).send(errors);
      }
      return res.send(profile);
    })
    .catch(err => res.status(404).send(err));
});

// route:   api/profiles/user/:user_id
// desc:    get profile by id
// access:  public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "imageUrl"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "user id not matched";
        return res.status(404).send(errors);
      }
      return res.send(profile);
    })
    // need to hard code the error underneath because the not mathced id with mongoose would throw the .catch error
    .catch(err => res.status(404).send("user id not matched"));
});

// route:   api/profiles/all
// desc:    get all profiles
// access:  public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find({})
    .populate("user", ["name", "imageUrl"])
    .then(profiles => {
      if (profiles.length === 0) {
        errors.noProfiles = "no existing profiles";
        return res.status(404).send(errors);
      }
      return res.send(profiles);
    })
    .catch(err => res.status(404).send(err));
});

// route:   api/profiles
// desc:    create or edit user profile
// access:  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).send(errors);
    }
    const profileFields = {};
    profileFields.user = req.user;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.skills) profileFields.skills = req.body.skills.split(",");
    if (req.body.github) profileFields.github = req.body.github;
    Profile.findOne({ user: req.user._id }).then(profile => {
      if (profile) {
        // update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.send(profile));
      } else {
        //FOLLOWING PART COMMENTED OUT, USED IN UDEMY TOUTORIAL, DONT   UNDERSTAND WHY
        // create
        // Profile.findOne({ handle: req.body.handle }).then(profile => {
        //   if (profile) {
        //     errors.handle = "that handle already exists";
        //     return res.status(400).send(errors);
        //   }
        const newProfile = new Profile(profileFields);
        Profile.create(newProfile)
          .then(profile => res.send(profile))
          .catch(err => res.send(err));
        // });
      }
    });
  }
);

module.exports = router;
