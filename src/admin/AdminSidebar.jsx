import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <nav className="space-y-4">
        <Link to="/admin/products" className="block hover:text-blue-400">
          📦 Products
        </Link>
        <Link to="/admin/products/create" className="block hover:text-blue-400">
          ➕ Add Product
        </Link>
      </nav>
    </aside>
  );
}
