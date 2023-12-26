const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "UserName is required"],
    maxLength: [20, "Maximum limit is 30 characters only"],
    minLength: [3, "Minimum 3 characters name is required"]
  },
  email: {
    type: String,
    required: [true, "User email id is required"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password should be of minimum 8 characters"],
    select: false
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    default: "user"
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });

// encrypted user password 
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 8);
})

// creating a json_web_token of user id 
UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

// compare password 
UserSchema.methods.comparePassword = async function (enteredPassword) {
  const isMatched = await bcrypt.compare(enteredPassword, this.password);
  // console.log(isMatched);
  return isMatched;
}

// reset password token 
UserSchema.methods.getResetToken = function () {
  // creating random token using crypto 
  const resetToken = crypto.randomBytes(20).toString("hex");
  // hasing token 
  this.resetPasswordToken = crypto
    .createHash("sha256").update(resetToken).digest("hex");
  // adding expire 
  this.resetPasswordExpire = Date.now() + (15 * 60 * 1000);
  return resetToken;
}

module.exports = mongoose.model("User", UserSchema);