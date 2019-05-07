const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  password: String,
  type: String,
  token: String,
  avatar: String,
  title: String,
  desc: String,
  company: String,
  money: String,
  date: { type: Date, default: Date.now }
});

/**
 *  对密码进行加盐
 */
UserSchema.pre('save', function (next) {
  // this 此处指代 Schema
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

/**
 *  增加密码比对的方法
 */
UserSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}


mongoose.model("user", UserSchema);
