const { Schema, model } = require("mongoose");

let schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
});
module.exports = model("Messages", schema);
