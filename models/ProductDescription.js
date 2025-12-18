const mongoose = require("mongoose");
const { Schema } = mongoose;

const productDescriptionSchema = new Schema(
  {
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },

    short_description: String,
    detailed_description: String,
    key_features: [String],

    promotional_text: String,
    social_media_caption: String,

    meta_title: String,
    meta_description: String,
    keywords: [String],

    tone: String,
    language: { type: String, default: "en" },

    generated_by: { type: String, default: "ai" },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductDescription", productDescriptionSchema);
