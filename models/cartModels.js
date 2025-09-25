const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: [true, "fill out this field"],
      },
      price: {
        type: Number,
        required: [true, "fill out this field"],
      },
    },
  ],
});

const cartModel = model("cart", cartSchema);

module.exports = cartModel;
