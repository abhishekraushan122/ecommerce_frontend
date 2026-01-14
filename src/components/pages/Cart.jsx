import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (!cartItems.length) {
    return (
      <div className="text-center mt-10">
        <p>Your cart is empty</p>
        <Link to="/products" className="text-blue-600">
          Go shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      {cartItems.map(item => (
        <div key={item._id} className="flex gap-4 border-b py-4">
          <img
            src={`/uploads/${item.image}`}
            className="w-20 h-20 object-cover rounded"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{item.title}</h3>
            <p>₹{item.price}</p>
            <p>Qty: {item.qty}</p>
          </div>

          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-600"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="text-right mt-6 font-bold text-xl">
        Total: ₹{total}
      </div>

      <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg">
        Proceed to Checkout
      </button>
    </div>
  );
}
