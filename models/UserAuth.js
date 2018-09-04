const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserAuthSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default:
      "https://mbevivino.files.wordpress.com/2011/08/silhouette_i-m-congnito.jpg"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// mLAb is going to make the collection plural automatically, in this case "userAuths"
module.exports.UserAuth = mongoose.model("userAuth", UserAuthSchema);
