const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "userAuth"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "userAuth"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "userAuth"
      },
      name: {
        type: String
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("post", PostSchema);
