const mongoose = require("mongoose");
const { Schema } = mongoose;

const dailySummarySchema = new Schema(
  {
    report_date: { type: Date, required: true, unique: true },

    sales: {
      total_sales: Number,
      total_transactions: Number,
      cash_sales: Number,
      card_sales: Number,
      upi_sales: Number,
      top_products: [
        {
          product_id: Schema.Types.ObjectId,
          product_name: String,
          quantity_sold: Number,
          revenue: Number,
        },
      ],
    },

    expenses: {
      total_expenses: Number,
      by_category: [{ category: String, amount: Number }],
    },

    inventory: {
      low_stock_items: [
        {
          product_id: Schema.Types.ObjectId,
          product_name: String,
          quantity: Number,
        },
      ],
      out_of_stock_items: [
        { product_id: Schema.Types.ObjectId, product_name: String },
      ],
    },

    profit: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("DailySummary", dailySummarySchema);
