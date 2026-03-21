import React from "react";
import { createContext, useState } from "react";

export const createDatatwo = createContext();

export const WishlistProvider = ({children}) => {
  const [wishlist, setWishlist] = useState([])

  const addToWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    if (exists) {
      setWishlist(
        wishlist.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setWishlist([...wishlist, { ...product, qty: 1 }]);
    }
  };

  return (
    <createDatatwo.Provider value={{ wishlist, addToWishlist }}>
      {children}
    </createDatatwo.Provider>
  );
};
