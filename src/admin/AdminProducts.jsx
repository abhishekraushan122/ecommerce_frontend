import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/products/delete/${id}`);
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id} className="border-t">
              <td className="p-3">{p.title}</td>
              <td className="p-3 text-center">₹{p.price}</td>
              <td className="p-3 flex gap-3 justify-center">
                <Link
                  to={`/admin/products/${p._id}/edit`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
