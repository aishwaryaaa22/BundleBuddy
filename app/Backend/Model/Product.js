
const mongoose=require('mongoose')
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  basePrice: { type: Number, required: true },
  images: [String],
  category: String
});