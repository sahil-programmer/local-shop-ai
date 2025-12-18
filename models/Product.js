const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: String,
    barcode: { type: String, unique: true, sparse: true },

    cost_price: Number,
    selling_price: { type: Number, required: true },
    mrp: Number,

    stock_quantity: { type: Number, default: 0 },
    low_stock_alert: { type: Number, default: 5 },
    unit: { type: String, default: "piece" },

    brand: String,
    supplier_name: String,
    image_url: String,

    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", brand: "text" });
productSchema.index({ category: 1 });
productSchema.index({ barcode: 1 });

module.exports = mongoose.model("Product", productSchema);
