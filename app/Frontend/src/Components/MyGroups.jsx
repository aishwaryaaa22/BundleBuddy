import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { createData } from "./Context";
import toast from "react-hot-toast";

const Timer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(expiryDate).getTime() - now;

      if (distance < 0) {
        setTimeLeft("Expired");
        clearInterval(timer);
      } else {
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return <span className="text-orange-500 font-bold">{timeLeft}</span>;
};
const MyGroups = () => {
  const { addToCart } = useContext(createData);
  const { bundleItems, clearBundle } = useContext(createData);
  const BUNDLE_LIMIT = 3; // Change this based on your project requirements

  const handleFinalizeBundle = () => {
    // Create a single "Bundle Object" to put in the cart
    const finalBundle = {
      id: `bundle-${Date.now()}`,
      name: "Group Buy Bundle",
      price: bundleItems.reduce((total, item) => total + Number(item.price), 0),
      qty: 1,
      isBundle: true,
      subItems: bundleItems, // Reference what's inside
    };

    addToCart(finalBundle); // Send the whole bundle to the cart
    clearBundle(); // Reset the bundle builder
    toast.success("Bundle successfully added to cart!");
  };
  const finalizeBundle = async (group) => {
    console.log("Bundle Group Data:", group);
    try {
      // 1. Backend call: Database se hatane ke liye
      // Apni actual API URL yahan likhein
      await axios.post(
        `http://localhost:5000/api/groups/finalize/${group._id}`,
      );

      // 2. Cart mein add karein
      //const finalPrice = Number(group.productPrice || group.price);
      addToCart({
        id: group._id,
        name: group.productName,
        price: Number(String(group.productPrice).replace(/[^0-9]/g, '')),
        imgUrl: group.productImage,
        qty: 1,
      });

      // 3. Frontend state update: UI se card gayab karne ke liye
      setGroups((prevGroups) => prevGroups.filter((g) => g._id !== group._id));

      toast.success("Added to cart and bundle finalized!");
    } catch (error) {
      console.error("Backend error:", error);
      toast.error("Failed to remove bundle from database");
    }
  };

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("memberJoined", (data) => {
      setGroups((prevGroups) =>
        prevGroups.map((g) =>
          g.productId === data.productId
            ? { ...g, currentMembers: data.currentMembers }
            : g,
        ),
      );
    });

    return () => socket.disconnect();
  }, []);
  // Backend se data lane ka logic
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5000/api/my-groups", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setGroups(Array.isArray(data) ? data : []);
        } else {
          console.error("Server Error:", data.message);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white p-6">
        Loading your bundles...
      </div>
    );
  }
  const handleDelete = async (bundleId) => {
    if (!window.confirm("Are you sure you want to leave this bundle?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/my-groups/${bundleId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.ok) {
        // UI se turant hatane ke liye state update karein
        setGroups(groups.filter((group) => group._id !== bundleId));
        alert("Left the bundle successfully.");
      } else {
        alert("Failed to delete.");
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">My Joined Bundles</h1>

      {groups.length === 0 ? (
        <p className="text-gray-400">You haven't joined any bundles yet.</p>
      ) : (
        <div className="grid gap-6">
          {groups.map((group) => (
            <div
              key={group._id}
              className="flex items-center bg-gray-900 p-4 rounded-xl border border-gray-800 shadow-lg"
            >
              {/* 1. Product Image */}
              <img
                src={group.productImage || "https://via.placeholder.com/150"}
                alt={group.productName}
                className="w-24 h-24 object-cover rounded-lg mr-6"
              />

              <div className="flex-1">
                {/* 2. Product Name */}
                <h2 className="text-xl font-semibold">
                  {group.productName || "Bundle Product"}
                </h2>

                {/* 3. Members Status */}
                <div className="flex items-center mt-2 text-sm text-gray-400">
                  <div className="flex -space-x-2 mr-3">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-blue-500 border-2 border-gray-900 flex items-center justify-center text-[10px]"
                      >
                        👤
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center mt-2 text-sm text-gray-400">
                    <div className="flex -space-x-2 mr-3">
                      {[...Array(group.currentMembers)].map((_, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full bg-blue-500 border-2 border-gray-900 flex items-center justify-center text-[10px]"
                        >
                          👤
                        </div>
                      ))}
                    </div>
                    <span>
                      {group.currentMembers}/{group.maxMembers} members joined
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  {group.currentMembers === group.maxMembers ? (
                    <button
                      // MyGroups.jsx ke andar addToCart button ka onClick update karein:
                      onClick={() => {
                        // 1. Pehle cart mein add karein
                        addToCart({
                          id: group._id || group.id,
                          name: group.productName || "Bundle Product",
                          price: group.price,
                          imgUrl: group.productImage,
                          qty: 1,
                        });

                        // 2. Ab is specific group/bundle ko UI se remove karein
                        // Maan lijiye aapki state ka naam 'groups' aur 'setGroups' hai
                        setGroups((prevGroups) =>
                          prevGroups.filter((g) => g._id !== group._id),
                        );

                        // 3. Optional: Success message
                        toast.success(
                          "Bundle added and removed from your list!",
                        );
                      }}
                      className="w-70 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors animate-pulse"
                    >
                      Bundle Full! Add to Cart
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-700 text-gray-400 font-bold py-2 px-4 rounded-lg cursor-not-allowed"
                    >
                      Waiting for {group.maxMembers - group.currentMembers} more
                      members
                    </button>
                  )}
                </div>

                {/* 4. Time Left */}
                <p className="mt-3 text-sm">
                  Time Left: <Timer expiryDate={group.expiryDate} />
                </p>
              </div>

              {/* 5. Price and Details */}
              <div className="text-right ml-4">
                <p className="text-green-400 font-bold text-lg">
                  ₹{group.productPrice}
                </p>

                <button
                  onClick={() => handleDelete(group._id)}
                  className="bg-red-500/20 mt-4 hover:bg-red-600 hover:text-white text-red-500 p-2 rounded-lg transition-all border border-red-500/50"
                  title="Leave Bundle"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyGroups;
