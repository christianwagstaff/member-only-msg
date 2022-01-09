const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

const BoardSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    creator: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    createdDate: { type: Date, required: true },
  },
  opts
);

BoardSchema.virtual("formatted_name").get(function () {
  return `b/${this.name}`;
});

module.exports = mongoose.model("Board", BoardSchema);
