import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }, quantity: { type: Number, required: true } }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

export const Order = mongoose.model('Order', orderSchema);
