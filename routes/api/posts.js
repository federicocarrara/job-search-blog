const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const validatePostInput = require("../../validation/post");

// route:   GET api/posts
// desc:    get all posts
// access:  public
router.get("/", (req, res) => {
  Post.find({})
    .sort({ date: -1 })
    .then(post => res.send(post))
    .catch(err => res.status(404).send(err));
});

// route:   GET api/posts/:id
// desc:    get post by id
// access:  public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.send(post))
    .catch(err => res.status(404).send(err));
});

// route:   POST api/posts
// desc:    create new post
// access:  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).send(errors);
    }
    const newPost = new Post({
      user: req.user.id,
      name: req.body.name,
      text: req.body.text
    });
    Post.create(newPost)
      .then(post => res.send(post))
      .catch(err => res.send(err));
  }
);

// route:   POST api/posts/like/:id
// desc:    like post
// access:  private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then(post => {
      const usersLike = post.likes.map(like => like.user.toString());
      if (usersLike.indexOf(req.user.id) !== -1) {
        const indexToDelete = usersLike.indexOf(req.user.id);
        post.likes.splice(indexToDelete, 1);
        post
          .save()
          .then(post => res.send(post))
          .catch(err => res.send(err));
      } else {
        post.likes.unshift({ user: req.user.id });
        post
          .save()
          .then(post => res.send(post))
          .catch(err => res.send(err));
      }
    });
  }
);

// route:   POST api/posts/comment/:id
// desc:    comment post
// access:  private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newComment = {
      text: req.body.text,
      name: req.body.name,
      user: req.user.id
    };
    Post.findById(req.params.id).then(post => {
      post.comments.unshift(newComment);
      post
        .save()
        .then(post => res.send(post))
        .catch(err => res.send(err));
    });
  }
);

// route:   DELETE api/posts/comment/:post_id/:comment_id
// desc:    delete comment
// access:  private
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        const commentsArr = post.comments.map(comment => comment.id.toString());
        if (commentsArr.indexOf(req.params.comment_id) !== -1) {
          const indexToDelete = commentsArr.indexOf(req.params.comment_id);
          post.comments.splice(indexToDelete, 1);
          post
            .save()
            .then(post => res.send(post))
            .catch(err => res.send(err));
        } else {
          return res.send("comment doesn't exist");
        }
      })
      .catch(err => res.send(err));
  }
);

// route:   DELETE api/posts/:id
// desc:    get all posts
// access:  private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (req.user.id === post.user.toString()) {
          post.remove().then(res.send("post deleted"));
        }
      })
      .catch(err => res.status(404).send("post not found"));
  }
);

module.exports = router;
