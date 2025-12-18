const mongoose = require("mongoose");
const { Schema } = mongoose;

const businessInsightSchema = new Schema(
  {
    insight_type: String,
    title: String,
    description: String,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    data: Schema.Types.Mixed,
    status: {
      type: String,
      enum: ["new", "viewed", "dismissed"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BusinessInsight", businessInsightSchema);
