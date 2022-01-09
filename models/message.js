const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Member", required: true },
  createdDate: { type: Date, required: true },
  title: { type: String, required: true, maxlength: 100 },
  message: { type: String, required: true },
  deleted: { type: Boolean },
  deletedDate: { type: Date },
  board: { type: Schema.Types.ObjectId, ref: "Board", required: true },
});

module.exports = mongoose.model("Message", MessageSchema);
