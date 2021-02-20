const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/grace";

const commentSchema = mongoose.Schema({
  username: String,
  userId: String,
  comment: String,
  rate: {
    type: Number,
    default: 1,
  },
  productId: String,
});

const Comment = mongoose.model("comment", commentSchema);

exports.addComment = (comment) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        let newComment = new Comment(comment);
        return newComment.save();
      })
      .then((data) => {
        mongoose.disconnect();
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
exports.getComments = (productId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return Comment.find({ productId: productId });
      })
      .then((comments) => {
        mongoose.disconnect();
        resolve(comments);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
