import React , {useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "./Allproducts.json";
import { createData } from "./Context";
import { Star } from "lucide-react";

const ProductPage = () => {
  const { addToCart } = useContext(createData);
  const { id } = useParams();
  const navigate = useNavigate();
  

  const product = products.find((item) => item.id === id);

  if (!product) {
    return <div className="p-10 text-center">Product not found!</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-500 hover:text-black"
      >
        ← Back to Shop
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Product Image */}
        <div className="bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src={product.imgUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <span className="text-sm text-gray-500">({product.review})</span>
            </div>
          <p className="text-2xl text-slate-400 mb-6">{product.price}</p>
          <p className="text-gray-300 mb-8 leading-relaxed">
            {product.description}
          </p>

          <button onClick={() => addToCart(product)} className="w-full cursor-pointer bg-slate-500 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
