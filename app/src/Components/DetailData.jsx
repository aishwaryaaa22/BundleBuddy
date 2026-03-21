import React from "react";
import { useParams } from "react-router-dom";
import data from "./Data.json";

function DetailData() {
  const { id } = useParams();
  const mData = data.find((d) => d.id === Number(id));
  return (
    <div>
        <img src={mData.imgUrl} height="100" alt="Loading..." />
      <p>ID:  {id}</p>
      <p>Name:  {mData.name}</p>
      <p>Brand:  {mData.brand}</p>
      <p>Price:  {mData.price}</p>
      <p>Country:  {mData.country}</p>
      <p>Color:  {mData.color}</p>
      <p>Description:  {mData.description}</p>
    </div>
  );
}

export default DetailData;
