const express = require("express");
const postRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { postModel } = require("../models/posts.model");

postRouter.post("/add", async (req, res) => {
  console.log(req.body);
  const { title, body, device, no_of_comments, userId } = req.body;
  try {
    const newPost = new postModel(req.body);
    await newPost.save();
    res.status(200).send({ msg: "Post is added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

postRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decode = jwt.verify(token, "linkedinAccount");
  const relationship_status = req.query.relationship_status;
  const device = req.query.device;
  const device1 = req.query.device1;
  const device2 = req.query.device2;
  const minComment = req.query.minComment || 0;
  const maxComment = req.query.maxComment || Infinity;
  console.log(minComment, maxComment);
  try {
    if (relationship_status) {
      const getPost = await postModel.find({
        $and: [
          { no_of_comments: { $gte: minComment } },
          { no_of_comments: { $lte: maxComment } },
          { is_married: relationship_status },
        ],
      });
      res.status(200).send(getPost);
    } else if (device) {
      const getPost = await postModel.find({
        userId: decode.userID,
        $and: [
          { no_of_comments: { $gte: minComment } },
          { no_of_comments: { $lte: maxComment } },
          { device: device },
        ],
      });
      res.status(200).send(getPost);
    } else if (device1 && device2) {
      const getPost = await postModel.find({
        userId: decode.userID,
        $and: [
          { no_of_comments: { $gte: minComment } },
          { no_of_comments: { $lte: maxComment } },
          { device: device1 },
          { device: device2 },
        ],
      });
      res.status(200).send(getPost);
    } else {
      const getPost = await postModel.find({
        userId: decode.userID,
        $and: [
          { no_of_comments: { $gte: minComment } },
          { no_of_comments: { $lte: maxComment } },
        ],
      });
      console.log(getPost);
      res.status(200).send(getPost);
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

postRouter.get("/top", async (req, res) => {
  const token = req.headers.authorization;
  const decode = jwt.verify(token, "linkedinAccount");
  try {
    const getPost = await postModel.find({ userId: decode.userID });
    let max = -Infinity;
    let m;
    console.log(getPost);
    for (let i = 0; i < getPost.length; i++) {
      if (getPost[i].no_of_comments > max) {
        m = getPost[i];
        max = getPost[i].no_of_comments;
        console.log(getPost[i].no_of_comments);
      }
    }
    res.status(200).send(m);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
postRouter.patch("/update/:id", async (req, res) => {
  let id = req.params.id;
  console.log(req.body, id);
  try {
    await postModel.findByIdAndUpdate(id, req.body);

    res.status(200).send({ msg: "Post is update" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
postRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await postModel.findByIdAndDelete({ _id: id });

    res.status(200).send({ msg: "Post is deleted" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
module.exports = { postRouter };
