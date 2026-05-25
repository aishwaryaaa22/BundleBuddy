import React from "react";
import { FaStar } from "react-icons/fa";

const ProductDisplay = (props) => {
  const { product } = props;
  return (
    <div>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.imgUrl} alt="" />
          <img src={product.imgUrl} alt="" />
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={product.imgUrl}
            alt=""
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <FaStar className="text-amber-500" />
          <p>(68)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
          <div className="productdisplay-right-description">
            ehgjhkhikedkejuhwwihijfifhefhcwff crfguhw cjferfwkihwf hwfgcwoif3
          </div>
          <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-size">
              <div>S</div>
              <div>M</div>
              <div>L</div>
            </div>
          </div>
          <button>ADD</button>
          <div className="productdisplay-right-Category">
            <p>
              {" "}
              <span>Category:</span> Men, T-shirt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
