const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Profile = require("../../models/Profile");
const UserAuth = require("../../models/UserAuth");
const validateProfileInput = require("../../validation/profile");
const validateEducationInput = require("../../validation/education");
const validateExperienceInput = require("../../validation/experience");

// route:   GET api/profiles
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

// route:   GET api/profiles/handle/:handle
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

// route:   GET api/profiles/user/:user_id
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

// route:   GET api/profiles/all
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

// route:   POST api/profiles
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
    const profileFields = {
      user: req.user,
      handle: req.body.handle,
      bio: req.body.bio,
      company: req.body.company,
      location: req.body.location,
      status: req.body.status,
      skills: req.body.skills.split(","),
      github: req.body.github
    };
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.send(profile));
      } else {
        const newProfile = new Profile(profileFields);
        Profile.create(newProfile)
          .then(profile => res.send(profile))
          .catch(err => res.send(err));
      }
    });
  }
);

// route:   POST api/profiles/experience
// desc:    add experience to profile
// access:  private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).send(errors);
    }
    const newExperience = {
      title: req.body.title,
      company: req.body.company,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current
    };
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        errors.noProfile = "there is no user profile";
        return res.status(404).send(errors);
      }
      profile.experience.unshift(newExperience);
      profile
        .save()
        .then(profile => res.send(profile))
        .catch(err => console.log(err));
    });
  }
);

// route:   POST api/profiles/education
// desc:    add education to profile
// access:  private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).send(errors);
    }
    const newEducation = {
      title: req.body.title,
      school: req.body.school,
      degree: req.body.degree,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current
    };
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        errors.noProfile = "there is no user profile";
        return res.status(404).send(errors);
      }
      profile.education.unshift(newEducation);
      profile
        .save()
        .then(profile => res.send(profile))
        .catch(err => console.log(err));
    });
  }
);

// route:   DELETE api/profiles/experience/experience_id
// desc:    delete experience using experience id
// access:  private

router.delete(
  "/experience/:experience_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      let indexToDelete = profile.experience
        .map(exp => exp.id)
        .indexOf(req.params.experience_id);
      if (indexToDelete !== -1) {
        profile.experience.splice(indexToDelete, 1);
        profile
          .save()
          .then(profile => res.send(profile))
          .catch(err => res.send(err));
      } else {
        return res.send("experience to delete not found");
      }
    });
  }
);

// route:   DELETE api/profiles/education/education_id
// desc:    delete education using education id
// access:  private

router.delete(
  "/education/:education_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      let indexToDelete = profile.education
        .map(edu => edu.id)
        .indexOf(req.params.education_id);
      if (indexToDelete !== -1) {
        profile.education.splice(indexToDelete, 1);
        profile
          .save()
          .then(profile => res.send(profile))
          .catch(err => res.send(err));
      } else {
        return res.send("education to delete not found");
      }
    });
  }
);

// route:   DELETE api/profiles
// desc:    delete profile and user
// access:  private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() =>
      UserAuth.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.send("profile and user deleted")
      )
    );
  }
);

module.exports = router;
