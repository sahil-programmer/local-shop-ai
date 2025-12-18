const mongoose = require("mongoose");
const { Schema } = mongoose;

const saleSchema = new Schema(
  {
    sale_number: { type: String, required: true, unique: true },
    customer_id: { type: Schema.Types.ObjectId, ref: "Customer" },
    customer_name: String,

    items: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        product_name: { type: String, required: true },
        quantity: Number,
        unit_price: Number,
        total: Number,
      },
    ],

    subtotal: Number,
    tax: Number,
    discount: Number,
    total: Number,

    payment_method: { type: String, enum: ["cash", "card", "upi", "credit"] },
    payment_status: { type: String, enum: ["paid", "pending", "credit"] },
  },
  { timestamps: true }
);

saleSchema.index({ sale_date: -1 });
saleSchema.index({ customer_id: 1 });

module.exports = mongoose.model("Sale", saleSchema);
