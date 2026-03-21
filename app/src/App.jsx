import React from "react";
import Navbar from "./Components/Navbar";
import Sectionone from "./Components/Sectionone";
import Sectiontwo from "./Components/Sectiontwo";
import Featured from "./Components/Featured";
import Navbartwo from "./Components/Navbartwo";
import Email from "./Components/Email";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import FullFormByState from "./Components/FullFormByState";
import ShopCollection from "./Components/ShopCollection";
import Womenn from "./Components/Womenn";
import Men from "./Components/Men";
import Accessories from "./Components/Accessories";
import Cart from "./Components/Cart";
import { CartProvider } from "./Components/Context";
import { WishlistProvider } from "./Components/Contexttwo";
import Wishlist from "./Components/Wishlist";
import ProductPage from "./Components/ProductPage";
function App() {
  return (
    <>
      <CartProvider>
        <WishlistProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Sectionone />} />
            <Route path="/FullFormByState" element={<FullFormByState />} />
            <Route path="/Sectiontwo" element={<Sectiontwo />} />
            <Route path="/Featured" element={<Featured />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/ShopCollection" element={<ShopCollection />} />
            <Route path="/Womenn" element={<Womenn />} />
            <Route path="/Men" element={<Men />} />
            <Route path="/Accessories" element={<Accessories />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/Wishlist" element={<Wishlist />} />

            
          </Routes>
        </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </>
  );
}

export default App;
