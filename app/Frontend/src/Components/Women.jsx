import React,  { useState, useMemo } from "react";
import Data from "./Women.json";
import Footer from "./Footer";
import Recommended from "./Recommended";
import Pagination from "./Pagination";
import "./Rec.css";
import Product from "./Women.json";
import { CiSearch } from "react-icons/ci";

function Women() {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [priceRange, setPriceRange] = useState(null);
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    setCurrentPage(0);
    let filtered = Product.filter((p) => {
      const matchesSearch = p.product
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesPrice =
        priceRange === null ||
        (p.price >= priceRange.min && p.price <= priceRange.max);

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sorting
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.product.localeCompare(b.product));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.product.localeCompare(a.product));
        break;
      default:
        break;
    }
    return filtered;
  }, [searchQuery, selectedCategory, selectBrand, priceRange, sortBy]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handlePriceFilter = (min, max) => {
    setPriceRange(
      priceRange?.min === min && priceRange?.max === max ? null : { min, max },
    );
  };
  

  const applyFilters = () => {
   console.log("Applied Filters:", filters);
  setIsOpen(false);
   };


  return (
    <div>
      <div className="columns-1 two">
        <div className="second">WOMEN</div>
      </div>
      <div className="flex">
    <div>
      <div className="p-4">

        
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold text-black">Filters</h2>
        
          </div>

          {/*search*/}

          <div className="flex items-center gap-2 mb-6">
            <input
              className="flex-1 h-10 px-4 bg-white rounded-l-xl border border-gray-300 placeholder:text-gray-500"
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <div className="flex justify-center items-center rounded-r-xl h-10 w-10 bg-red-600 text-white text-xl hover:bg-red-700 transition cursor-pointer">
              <CiSearch />
            </div>
          </div>

          {/*Sort*/}
          <div className="flex-1">
            <form className="text-sm font-medium" action="#">
              <label htmlFor="sort"></label>
              <select
                name="sort"
                id="sort"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                }}
                className="w-full max-w-xs px-3 py-2 border rounded"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-asc">Price: Low - High</option>
                <option value="price-desc">Price: High - Low</option>
                <option value="name-asc">Price: a - z</option>
                <option value="name-desc">Price: z - a</option>
              </select>
            </form>
          </div>
        </div>

        <div className="p-4 space-y-4 text-black">
          <div>
            <label className=" text-sm font-medium mb-1 flex items-center gap-1">
              {" "}
              <BiCategoryAlt />{" "}
              <ul className="space-y-2">
                {["All", "T-shirt", "Top", "Socks"].map((Category) => (
                  <li key={Category}>
                    <button
                      onClick={() => handleCategoryFilter(Category)}
                      className={`text-sm transition duration-200 flex items-center w-full ${
                        selectedCategory === Category
                          ? "text-red-600 font-semibold"
                          : "text-gray-600 hover:text-red-600"
                      }`}
                    >
                      <span className="mr-2">•</span> {Category}
                    </button>
                  </li>
                ))}
              </ul>
            </label>
          </div>

          <div>
            <p className=" text-sm font-medium mb-1 flex gap-1 text-black items-center">
              <IoPricetagOutline />
              Price Range
            </p>
            <ul className="space-y-2">
              {[
                { label: "Less than ₹10,000", min: 0, max: 10000 },
                { label: "₹10,000 - ₹20,000", min: 10000, max: 20000 },
                { label: "₹20,000 - ₹50,000", min: 20000, max: 50000 },
                { label: "₹50,000 - ₹100,000", min: 50000, max: 100000 },
                { label: "Above ₹100,000", min: 100000, max: Infinity },
              ].map((items) => (
                <li
                  key={items.label}
                  onClick={() => {
                    handlePriceFilter(items.min, items.max);
                  }}
                  className={`text-sm w-full flex items-center duration-200 transition rounded px-2 py-1 cursor-pointer ${
                    priceRange?.min === items.min &&
                    priceRange?.max === items.max
                      ? "text-red-600 font-semibold bg-red-50"
                      : "text-gray-600 hover:text-red-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-2">•</span>
                  {items.label}
                </li>
              ))}
            </ul>
          </div>

         
          <button
            onClick={applyFilters}
            className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500"
          >
            Apply Filters
          </button>
        </div>
      </div>

   <Recommended />
   </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-20 px-20 p-8">
        {Data.map((item) => (
          <div
            className="shadow-lg flex flex-col h-auto w-full text-sm"
            data-aos="fade-up"
            data-aos-delay={item.aosDelay}
            key={item.aosDelay}
          >
            <img
              className="w-full h-100 max-w-xs object-cover cursor-pointer"
              src={item.imgUrl}
              alt="image loading"
            />
            <p className="text-white text-3xl p-1">{item.name}</p>
            <p>{item.description}</p>
            <br />
            <p className="text-white text-2xl ">{item.price}</p>

            <div className="text-box">
              <a href="#" className="btn btn-white btn-animate py-2">
                ADD
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center p-10 mt-5">
      <Pagination/>
      </div>
      <Footer />
    </div>
    
  );
}

export default Women;
