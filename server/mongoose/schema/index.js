const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  work: String,
  age: Number,
  date: { type: Date, default: Date.now }
});
mongoose.model("user", UserSchema);
