import { createContext, useContext, useEffect, useState } from "react";
import api from "../../api/axiosClient";
import { successToast, errorToast } from "../../utils/toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

//   const fetchWishlist = async () => {
//     try {
//       const { data } = await api.get("/wishlist");
//       setWishlist(data.products || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

  const addToWishlist = async (productId) => {
    try {
      const { data } = await api.post("/wishlist/add", { productId });
      setWishlist(data.products);
      successToast("Added to wishlist ❤️");
    } catch (err) {
      errorToast(err.response?.data?.message || "Failed");
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const { data } = await api.delete(`/wishlist/${productId}`);
      setWishlist(data.products);
      successToast("Removed from wishlist ❌");
    } catch (err) {
      errorToast("Failed to remove");
    }
  };

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
