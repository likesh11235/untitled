import mongoose from 'mongoose';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';

const cartSchema = new mongoose.Schema(
    {
        cartItems: {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: { type: Number, required:true },
            price: { type: Number, required = true },
            size: { type: String, required: true},
            isPurchased: { type: Boolean, default: false },
            isDelivered: { type: Boolean, default: false },
            isPaid: { type: Boolean, default: false }

        },
        timestamps: true
    }
);

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;