const mongoose = require("mongoose");

const BorrowingSchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    borrowDate: { type: Date, default: Date.now() },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date },
    status: {
      type: String,
      enum: ["Borrowed", "Returned"],
      default: "Borrowed",
    },
  },
  { versionKey: false }
);

const BorrowingModel = mongoose.model("Borrow", BorrowingSchema);

module.exports = BorrowingModel;
