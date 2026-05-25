import React, { useContext } from "react";
import { ShopContext } from "./ShopContext";
import { IoMdArrowDropdown } from "react-icons/io";
import data from './Women.json';
import Item from "./Item.jsx";
import './ShopCategory.css';
const ShopCategory = (props) => {
  const { data } = useContext(ShopContext);
  return (
    <div className="Shop-category">
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 20 products
        </p>
        <div className="shopcategory-sort">
          Sort by <IoMdArrowDropdown />
        </div>
      </div>
      <div className="shopcategory-products">
        {data.map((item, i) => {
          if (props.category === item.category) {
            return <Item key={i} id={item.id} name={item.name} image={item.imgUrl} price={item.price}/>;
          }
          else{
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore cursor-pointer">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
