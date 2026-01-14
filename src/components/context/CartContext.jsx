import { createContext, useContext, useState } from "react";
import api from "../../api/axiosClient";
import { successToast, errorToast } from "../../utils/toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (productId, qty) => {
    try {
      const { data } = await api.post("/cart/add-cart", {
        productId,
        qty,
      });

      setCart(data.items);
      successToast("Product added to cart 🛒");
    } catch (error) {
      errorToast(
        error.response?.data?.message || "Failed to add product"
      );
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
