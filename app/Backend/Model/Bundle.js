const mongoose=require('mongoose')
const bundleSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  currentPrice: Number,
  targetMembers: { type: Number, default: 10 }, // Goal for max discount
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, required: true }, // The Deadline
  status: { 
    type: String, 
    enum: ['active', 'completed', 'expired'], 
    default: 'active' 
  }
});