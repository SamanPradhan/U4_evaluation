const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers.authorization);
  const decode = jwt.verify(token, "linkedinAccount");
  console.log("decode", decode);
  if (decode) {
    req.body.userId = decode.userID;
    req.body.is_married = decode.is_married;
    next();
  } else {
    res.status(400).send({ msg: "Login to access" });
  }
};

module.exports = { authentication };
