const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    city: { type: String, required: true },
    is_married: { type: Boolean, required: true },
  },
  {
    versionkey: false,
  }
);

const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };

// {
//     "name": "Ankit",
//     "email": "ankit@gmail.com",
//     "gender": "male",
//     "password": "45fkjf",
//     "age": 24,
//     "city": "Kolkata",
//     "is_married":  true
//   }
