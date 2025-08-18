import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  item: { type: String, required: true },
  propertyId: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("purchase", PurchaseSchema);
