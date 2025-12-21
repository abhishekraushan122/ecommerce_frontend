import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx";
import Products from "./components/pages/Products.jsx";
import ProductDetails from "./components/pages/ProductDetails.jsx";
import Cart from "./components/pages/Cart.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Admin
import AdminLayout from "./admin/AdminLayout";
import AdminProducts from "./admin/AdminProducts";
import AdminCreateProduct from "./admin/AdminCreateProduct";
import AdminEditProduct from "./admin/AdminEditProduct";

export default function App() {
  return (
    <Router>

      <Routes>

        {/* ================= USER ROUTES ================= */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Navbar />
              <main className="flex-grow container mx-auto px-4 py-6">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout>
                <AdminProducts />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products/create"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout>
                <AdminCreateProduct />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products/:id/edit"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout>
                <AdminEditProduct />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}
