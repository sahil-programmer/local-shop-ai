const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema(
  {
    description: String,
    category: String,
    amount: Number,
    payment_method: { type: String, enum: ["cash", "card", "upi", "bank"] },
    expense_date: { type: Date, default: Date.now },
    receipt_url: String,
    notes: String,
  },
  { timestamps: true }
);

expenseSchema.index({ expense_date: -1 });
expenseSchema.index({ category: 1 });

module.exports = mongoose.model("Expense", expenseSchema);
