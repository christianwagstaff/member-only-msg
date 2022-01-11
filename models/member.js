const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

const MemberSchema = new Schema(
  {
    name: { type: String, maxlength: 100, require: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    activeMember: { type: Boolean, required: true },
    admin: [{ type: Schema.Types.ObjectId, ref: "Board" }],
    icon: { type: Number, required: true, min: 0, max: 5 },
    imageLink: { type: String },
    dateJoined: { type: Date, required: true },
  },
  opts
);

MemberSchema.virtual("url").get(function () {
  return `/users/${this.name}`;
});

// Add virtual url for icon link
const imgs = ["bunny", "cat", "cloud", "owl", "penguin"];
MemberSchema.virtual("iconImg").get(function () {
  return `/images/${imgs[this.icon]}.png`;
});

module.exports = mongoose.model("Member", MemberSchema);
