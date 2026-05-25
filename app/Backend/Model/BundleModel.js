const mongoose=require('mongoose')

const bundleSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  status: { type: String, enum: ['active', 'completed', 'expired'], default: 'active' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  targetMembers: { type: Number, required: true },
  currentPrice: { type: Number }, // AI adjusts this as more people join
  expiryDate: { type: Date }
});