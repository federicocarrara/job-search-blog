const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProfileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "userAuth"
  },
  handle: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  company: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  github: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean
      }
    }
  ],
  education: [
    {
      title: {
        type: String,
        required: true
      },
      school: {
        type: String
      },
      degree: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});
// mLAb is going to make the collection plural automatically, in this case "userAuths"
module.exports = mongoose.model("profile", ProfileSchema);
