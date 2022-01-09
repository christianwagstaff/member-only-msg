const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Member", required: true },
  createdDate: { type: Date, required: true },
  message: { type: String, required: true },
  deleted: { type: Boolean },
  deletedDate: { type: Date },
  board: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model("Message", MessageSchema);
