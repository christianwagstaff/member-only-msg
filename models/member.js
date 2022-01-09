const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  name: { type: String, maxlength: 100, require: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  activeMember: { type: Boolean, required: true },
  admin: [{ type: Schema.Types.ObjectId, ref: "Board" }],
  icon: { type: Number, required: true },
  imageLink: { type: String },
  dateJoined: { type: Date, required: true },
});

module.exports = mongoose.model("Member", MemberSchema);
