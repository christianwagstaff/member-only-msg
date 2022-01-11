const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

const MessageSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    createdDate: { type: Date, required: true },
    title: { type: String, required: true, maxlength: 100 },
    message: { type: String, required: true },
    deleted: { type: Boolean },
    deletedDate: { type: Date },
    board: { type: Schema.Types.ObjectId, ref: "Board", required: true },
  },
  opts
);

// Virtual for Formatted date
MessageSchema.virtual("formatted_date").get(function () {
  return DateTime.fromJSDate(this.createdDate, {
    zone: "utc",
  }).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
});

module.exports = mongoose.model("Message", MessageSchema);
