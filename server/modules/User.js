const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, minlength: 2, unique: true },
    password: { type: String, required: true, minlength: 2 },
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema);

module.exports = UserModel;
