const { Schema, model } = require("mongoose");

let schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  templates: { type: Array }
});
module.exports = model("Acc", schema);
