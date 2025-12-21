import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosClient";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // LOAD PRODUCT
  useEffect(() => {
    api.get(`/products/${id}`).then(res => {
      setForm(res.data);
      if (res.data.image) {
        setPreview(`http://localhost:5000/uploads/${res.data.images}`);
      }
    });
  }, [id]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const update = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("description", form.description);

    if (image) {
      formData.append("image", image); // optional replace
    }

    try {
      setLoading(true);
      await api.put(`/products/update/${id}`, formData);
      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
         Edit Product
      </h2>

      {/* IMAGE */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Product Image</label>

        <div className="flex items-center gap-6">
          <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-400 text-sm">No Image</span>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            className="rounded-lg border p-2"
            onChange={handleImage}
          />
        </div>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={form.title}
          placeholder="Product Title"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <input
          value={form.price}
          type="number"
          placeholder="Price"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={e => setForm({ ...form, price: e.target.value })}
        />

        <input
          value={form.category}
          placeholder="Category"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
      </div>

      <textarea
        value={form.description}
        placeholder="Product Description"
        rows={4}
        className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      {/* SUBMIT */}
      <button
        onClick={update}
        disabled={loading}
        className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Product"}
      </button>
    </div>
  );
}
