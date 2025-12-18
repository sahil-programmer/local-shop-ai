const mongoose = require("mongoose");
const { Schema } = mongoose;

const businessSchema = new Schema({
  name: { type: String, required: true },
  owner_name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    postal_code: String,
  },
  category: { type: String },
  currency: { type: String, default: "INR" },
  tax_rate: { type: Number, default: 0 },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Business", businessSchema);
