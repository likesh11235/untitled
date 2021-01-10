import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    image: { type: String, required: true },
    color: { type: String, required: true },
    material: { type: String, required: true },
    Ldimension: { type: String, required: true },
    Mdimension: { type: String, required: true },
    Sdimension: { type: String, required: true },
    howToUse: { type: String, required: true },
    WashingTips: { type: String, required: true },
    Storage: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    Lprice: { type: Number, required: true },
    Mprice: { type: Number, required: true },
    Sprice: { type: Number, required: true },
    price: { type: Number, required: true },
    Lstock: { type: Number, required: true },
    Mstock: { type: Number, required: true },
    Sstock: { type: Number, required: true },
    lid: { type: Number, required: true },
    painted: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;
