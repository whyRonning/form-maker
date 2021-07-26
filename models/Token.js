const { Schema, model } = require("mongoose");

const schema = new Schema({
  login: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});
module.exports = model("Account", schema);
