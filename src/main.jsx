import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import { AuthProvider } from "./components/context/AuthContext.jsx";
import { CartProvider } from "./components/context/CartContext.jsx";
import { WishlistProvider } from "./components/context/WishlistContext.jsx";
import { ToastContainer } from "react-toastify";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
   // <StrictMode>
   //   <App />
   // </StrictMode>,
   <AuthProvider>
      <CartProvider>
         <WishlistProvider>
            <App />
            <ToastContainer
               position="top-right"
               autoClose={3000}
               hideProgressBar={false}
               newestOnTop
               closeOnClick
               pauseOnHover
               draggable
               theme="colored"
            />
         </WishlistProvider>
      </CartProvider>
   </AuthProvider>
)
