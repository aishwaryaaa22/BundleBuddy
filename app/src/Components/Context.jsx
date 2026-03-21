import React from "react";
import { createContext, useState } from "react";

export const createData = createContext();

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  return (
    <createData.Provider value={{ cart, addToCart }}>
      {children}
    </createData.Provider>
  );
};
