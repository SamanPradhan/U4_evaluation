const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    device: { type: String, required: true },
    no_of_comments: { type: Number, required: true },
    userId: { type: String },
    is_married: { type: Boolean },
  },
  {
    versionkey: false,
  }
);

const postModel = mongoose.model("post", postSchema);
module.exports = { postModel };

// {
//   "title": "new post",
//   "body": "job desc",
//   "device": "laptop",
//   "no_of_comments": "5"
// }
