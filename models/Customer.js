const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: String,
    address: String,

    total_purchases: { type: Number, default: 0 },
    total_spent: { type: Number, default: 0 },
    last_purchase: Date,

    points: { type: Number, default: 0 },
    notes: String,
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

customerSchema.index({ phone: 1 });
customerSchema.index({ name: "text" });

module.exports = mongoose.model("Customer", customerSchema);
