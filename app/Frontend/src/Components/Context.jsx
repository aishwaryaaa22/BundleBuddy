import React from "react";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const createData = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [bundleItems, setBundleItems] = useState([]);

  const addToBundle = (product) => {
    
    if (!bundleItems.find((item) => item.id === product.id)) {
      setBundleItems([...bundleItems, { ...product, qty: 1 }]);
    }
  };
  const clearBundle = () => setBundleItems([]);

  const addToCart = (product) => {
    // 1. Forceful Price Extraction
    // Hum har mumkin koshish karenge price nikalne ki
    let finalPrice = 0;

    if (typeof product.price === 'number' && product.price > 0) {
        finalPrice = product.price;
    } else if (product.productPrice) {
        finalPrice = Number(product.productPrice);
    } else if (product.newPrice) {
        finalPrice = Number(product.newPrice);
    } else {
        // Agar kuch nahi mila toh default bundle price (Testing ke liye)
        finalPrice = 699; 
    }

    console.log("Adding to Cart - ID:", product.id, "Final Price:", finalPrice);

    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
        setCart(cart.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        ));
    } else {
        // Sabse important line: Hum manually price key ko override kar rahe hain
        const newItem = {
            ...product,
            price: finalPrice, // 👈 Ye purane 0 ko replace kar dega
            qty: 1
        };
        setCart([...cart, newItem]);
    }

    toast.success(`${product.name} added to cart!`, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };
  // Context file ke andar functions:

  // 1. Quantity badhane ke liye
  const increaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, qty: Number(item.qty) + 1 } : item,
      ),
    );
  };

  // 2. Quantity kam karne ke liye
  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: Number(item.qty) - 1 }
          : item,
      ),
    );
  };

  // 3. Delete karne ke liye
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <createData.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        bundleItems,
        addToBundle,
        clearBundle,
      }}
    >
      {children}
    </createData.Provider>
  );
};
