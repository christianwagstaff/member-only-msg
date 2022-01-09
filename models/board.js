const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  creator: { type: Schema.Types.ObjectId, ref: "Member", required: true },
  createdDate: { type: Date, required: true },
});

module.exports = mongoose.model("Board", BoardSchema);
