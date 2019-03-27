const mongoose = require("mongoose");
const url = 'mongodb://localhost:27017/boss'
mongoose.connect(url)
module.exports = mongoose