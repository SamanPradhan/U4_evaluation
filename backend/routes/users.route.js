const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/users.model");

userRouter.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, gender, password, age, city, is_married } = req.body;
  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      const newUser = new userModel({
        name,
        email,
        gender,
        password: hash,
        age,
        city,
        is_married,
      });
      await newUser.save();
      res.status(200).send({ msg: "Register successfull" });
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      bcrypt.compare(password, findUser.password, (err, com) => {
        if (com) {
          const getToken = jwt.sign(
            { userID: findUser._id, is_married: findUser.is_married },
            "linkedinAccount"
          );
          res.status(200).send({ msg: "login successfull", token: getToken });
        } else {
          res.status(400).send({ msg: "Password is wrong" });
        }
      });
    } else {
      res.status(404).send({ msg: "email is not registered" });
    }
  } catch (error) {
    res.status(400).send({ msg:"email already registered, please log in" });
  }
});
module.exports = { userRouter };
