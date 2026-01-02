import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axiosClient";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="h-64 bg-gray-200 animate-pulse rounded" />
      </div>
    );
  }

  if (!product) {
    return <p className="text-center">Product not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 grid md:grid-cols-2 gap-8">

      {/* IMAGE GALLERY */}
      <div>
        <img
          src={`${import.meta.env.VITE_API_URL}/uploads/${product.images?.[0]}`}
          alt={product.title}
          className="w-full h-96 object-cover rounded-lg"
        />

        <div className="flex gap-3 mt-4">
          {product.images?.map((img, i) => (
            <img
              key={i}
              src={`${import.meta.env.VITE_API_URL}/uploads/${img}`}
              alt="thumb"
              className="w-20 h-20 object-cover rounded cursor-pointer hover:ring-2 ring-blue-500"
            />
          ))}
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {product.title}
        </h1>

        <p className="text-gray-600 mt-2">
          Category: <span className="font-medium">{product.category}</span>
        </p>

        <p className="text-2xl font-bold text-blue-600 mt-4">
          ₹{product.price}
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          {product.description}
        </p>

        {/* STOCK */}
        <p className="mt-4">
          Status:{" "}
          {product.countInStock > 0 ? (
            <span className="text-green-600 font-semibold">In Stock</span>
          ) : (
            <span className="text-red-600 font-semibold">Out of Stock</span>
          )}
        </p>

        {/* QTY SELECT */}
        {product.countInStock > 0 && (
          <div className="flex items-center gap-4 mt-4">
            <span className="font-semibold">Qty:</span>
            <select
              value={qty}
              onChange={e => setQty(Number(e.target.value))}
              className="border rounded p-2"
            >
              {[...Array(product.countInStock).keys()].map(x => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mt-6">
          <button
            disabled={product.countInStock === 0}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            Add to Cart
          </button>

          <button className="px-4 py-3 border rounded-lg hover:bg-gray-100">
            ❤️
          </button>
        </div>

        {/* EXTRA INFO */}
        <div className="mt-6 border-t pt-4 text-sm text-gray-500">
          <p>🚚 Free delivery on orders above ₹999</p>
          <p>🔁 7-day return policy</p>
          <p>🔒 Secure payments</p>
        </div>
      </div>
    </div>
  );
}
