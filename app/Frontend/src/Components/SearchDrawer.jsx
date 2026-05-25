import React, { useState, useEffect } from "react";
import { Search, X, TrendingUp, ArrowRight, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import product from "./Women.json";
import { Link } from "react-router-dom";
const SearchDrawer = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query) {
      addToRecent(query);
      // You could also redirect to a /search page here
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const addToRecent = (term) => {
    if (!term.trim()) return;

    setRecentSearches((prev) => {
      // 1. Remove the term if it already exists (to move it to the top)
      const filtered = prev.filter((item) => item !== term);
      // 2. Add to start and limit to 5 items
      const updated = [term, ...filtered].slice(0, 5);

      // 3. Save to localStorage
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const filteredResults =
    query.length > 1
      ? product
          .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 4)
      : [];
  // Mock Data from your JSON structure
  const trending = [
    { id: 2, name: "Baggy T-shirt" },
    { id: 4, name: "Oversized Tee" },
    { id: 300, name: "Lower" },
  ];
  const recent = ["Lower", "T-shirt"];

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 w-full bg-white z-50 shadow-2xl border-b"
          >
            <div className="max-w-4xl mx-auto px-6 py-8">
              {/* Search Input Area */}
              <div className="flex items-center gap-4 border-b-2 border-black pb-4">
                <Search className="text-slate-600" size={28} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for products, brands, and more..."
                  className="w-full text-2xl outline-none text-slate-600"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              {/*results section */}
              <motion.div>
                <div className="mt-8">
                  {query.length > 1 ? (
                    <div>
                      <div className="flex justify-between items-end mb-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                          Products Found ({filteredResults.length})
                        </h3>
                        <button className="text-sm font-bold flex items-center gap-1 hover:underline">
                          View All <ArrowRight size={14} />
                        </button>
                      </div>

                      {filteredResults.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filteredResults.map((product) => (
                            <motion.div
                              layout
                              key={product.id}
                              className="flex items-center gap-4 p-3 border border-transparent hover:border-gray-200 hover:bg-gray-50 rounded-xl transition-all cursor-pointer"
                            >
                              <Link
                                to={`/product/${product.id}`}
                                key={product.id}
                                className="product-card transition-all hover:scale-105 cursor-pointer"
                                onClick={() => setOpen(false)}
                              >
                                <img
                                  src={product.imgUrl}
                                  alt={product.name}
                                  className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                                />
                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    {product.name}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {product.category}
                                  </p>
                                  <p className="text-sm font-bold mt-1">
                                    {product.price}
                                  </p>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <p className="py-10 text-center text-gray-500">
                          No products found for "{query}"
                        </p>
                      )}
                    </div>
                  ) : (
                    /* Default Suggestions (Trending/Recent) */
                    <div className="text-gray-400 italic">
                      What are you searching for?
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Suggestions Grid */}
              <div className="grid md:grid-cols-2 gap-12 mt-10 mb-4">
                {/* Recent Searches */}
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                    <Clock size={14} /> Recent Searches
                  </h3>
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      {recentSearches.length > 0 && (
                        <button
                          onClick={clearRecent}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {recentSearches.length > 0 ? (
                        recentSearches.map((item) => (
                          <button
                            key={item}
                            onClick={() => setQuery(item)} // Clicking a tag fills the search
                            className="px-4 py-2 bg-gray-50 hover:bg-black hover:text-white rounded-full text-sm text-gray-700 transition-all border border-gray-100"
                          >
                            {item}
                          </button>
                        ))
                      ) : (
                        <p className="text-sm text-gray-400 italic">
                          No recent searches
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Trending Now */}
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                    <TrendingUp size={14} /> Trending Now
                  </h3>
                  <ul className="space-y-3">
                    {trending.map((item) => (
                      <li key={item.id}>
                        {" "}
                      
                        <Link
                          to={`/product/${item.id}`}
                          className="text-gray-600 hover:text-black cursor-pointer flex items-center gap-3 group"
                          onClick={() => setOpen(false)}
                        >
                          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-black" />
                          {item.name}{" "}
                          {/* 2. Sirf item.name render karein, pura item nahi */}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchDrawer;
