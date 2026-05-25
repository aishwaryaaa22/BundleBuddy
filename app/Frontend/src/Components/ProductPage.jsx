import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "./Allproducts.json";
import { createData } from "./Context";
import { Star } from "lucide-react";
import { io } from "socket.io-client";

const ProductPage = () => {
  const { addToCart } = useContext(createData);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLocating, setIsLocating] = useState(false);

  const [product, setProduct] = useState(null);
  const [displayPrice, setDisplayPrice] = useState(0);
  const socket = io("http://localhost:5000");
  // 1. States ke niche ye useEffect dalo
  useEffect(() => {
    // Backend se naya price aane ka intezaar karein
    socket.on("priceUpdated", (data) => {
      console.log("Socket Data:", data); // Check karo console mein kya aa raha hai
      // Dono check laga do safety ke liye
      if (data.productId === id || data.productId === product?._id) {
        setDisplayPrice(data.newPrice);
      }
    });

    // Component band hote waqt listener ko hatayein (Cleanup)
    return () => {
      socket.off("priceUpdated");
    };
  }, [id, product]); // Jab ID ya product badle, tab ise refresh karein

  useEffect(() => {
    if (product) {
      setDisplayPrice(product.price);
    }
  }, [product]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.emit("join_bundle_room", id);

    socket.on("bundle_updated", (data) => {});

    return () => socket.disconnect();
  }, [id]);

  // Line 33 ko aise change karein
  const current = products.find((item) => item.id === id);

  useEffect(() => {
    if (current) {
      setProduct(current);
      setDisplayPrice(current.price); // AI logic ke liye
    }
  }, [current]);

  if (!current) {
    return <div className="p-10 text-center">Product not found!</div>;
  }

  const handleJoin = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to join");
      return;
    }

    const response = await fetch("http://localhost:5000/api/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //
      },
    });
    // ... baaki logic
  };

  const handleGroupBuy = async () => {
    // 1. Check Login Token
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to join!");
      return;
    }

    setIsLocating(true);

    try {
      // 2. Get Location (Promise based)
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
        });
      });

      const { latitude, longitude } = position.coords;

      // 3. Expiry Date (24 hours from now)
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 24);

      // 4. API Call (Sahi data ke saath)
      const response = await fetch("http://localhost:5000/api/groups/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          productPrice: Number(String(product?.price).replace(/[^0-9]/g, "")),
          productImage: product.imgUrl,
          expiryDate: expiryDate,
          // Backend ko isi format mein data chahiye
          location: {
            type: "Point",
            coordinates: [longitude, latitude], // [lng, lat] order zaroori hai
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          data.message ||
            `Joined Successfully! Members: ${data.group?.currentMembers || 1}`,
        );
        {
          /*change */
        }
      } else {
        alert(data.message || "Failed to join group");
      }
    } catch (error) {
      console.error("Error in joining group:", error);
      if (error.code === 1) {
        alert(
          "Location permission denied. Please allow location from settings.",
        );
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-500 hover:text-black"
      >
        ← Back to Shop
      </button>

      <h4 className="text-xl font-bold">Product ID: {id}</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Product Image */}
        <div className="bg-gray-100 rounded-2xl overflow-hidden">
          <img src={product?.imgUrl} className="w-full h-full object-cover" />
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">{product?.name}</h1>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product?.review})</span>
          </div>
          <p className="text-2xl text-slate-400 mb-6">₹{displayPrice}</p>
          <p className="text-gray-300 mb-8 leading-relaxed">
            {product?.description}
          </p>
          {displayPrice < product?.price && (
            <div className="flex items-center gap-2 mt-2 w-max px-3 py-1.5 bg-indigo-900/40 border border-indigo-500/50 rounded-lg animate-pulse">
              <span className="text-indigo-400">✨</span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                AI Optimized Price Applied
              </span>
            </div>
          )}
          <button
            onClick={() => addToCart(product)}
            className="w-full cursor-pointer bg-slate-400 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
          {/* <button
            onClick={() => handleGroupBuy(product.id)}
            className="w-full bg-indigo-800 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-all active:scale-95"
          >
            Buy now (Group Buy)
          </button>*/}
          {/* 1. Parent Container mein 'flex' aur 'items-stretch' zaroori hai */}
          <div className="flex flex-row gap-4 mt-8 w-full items-center">
            {/* Add to Cart - Left Side */}

            {/* Buy Now - Right Side */}
            <button
              onClick={() => handleGroupBuy(id || product?._id)}
              className={`flex-1 h-14 rounded-2xl font-bold transition-all active:scale-95 shadow-lg ${
                displayPrice < product?.price
                  ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/20 scale-[1.02]"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white"
              }`}
            >
              {displayPrice < product?.price ? "Group Buy" : "Add to Bundle"}
            </button>
          </div>

          {/* Debug link (Chota rakhein taaki UI kharab na ho) */}
          <div className="mt-4 text-center">
            <button
              onClick={() => setDisplayPrice(product?.price - 100)}
              className="text-[10px] text-slate-500 hover:underline"
            >
              PRICE DROP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
