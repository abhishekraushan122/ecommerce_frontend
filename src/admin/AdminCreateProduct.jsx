import { useState } from "react";
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function AdminCreateProduct() {
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

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async () => {
  if (!image) return alert("Please select an image");

  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("price", form.price);
  formData.append("category", form.category);
  formData.append("description", form.description);
  formData.append("image", image);

  try {
    setLoading(true);

    await api.post("/products/create", formData); // ✅ FIXED

    alert("Product created successfully");
    navigate("/admin/products");

  } catch (err) {
    console.error(err.response?.data || err.message);
    alert(err.response?.data?.message || "Failed to create product");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
         Add New Product
      </h2>

      {/* IMAGE UPLOAD */}
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
            className="rounded-lg border p-2"
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
          
        </div>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Product Title"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Price"
          type="number"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={e => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Category"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
      </div>

      <textarea
        placeholder="Product Description"
        className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        rows={4}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      {/* SUBMIT */}
      <button
        onClick={submit}
        disabled={loading}
        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </div>
  );
}
