const mongoose = require("mongoose");
const { Schema } = mongoose;

const aiConversationSchema = new Schema(
  {
    user_message: String,
    ai_response: String,
    intent: String,
    entities: Schema.Types.Mixed,
    was_helpful: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIConversation", aiConversationSchema);
