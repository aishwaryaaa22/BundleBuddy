import React from 'react'
import data from "./Data.json"
import { Link } from 'react-router-dom'
function FetchData() {
  return (
    <div>
{
    data.map((item)=>(
             <>
             <Link to={`/details/${item.id}`}><img src={item.imgUrl} height="100" alt="Loading" /></Link>
             <p>Id:{item.id}</p>
             <Link to={`/details/${item.id}`}>Name:{item.name}</Link>
             </>
    ))

}
    </div>
  )
}

export default FetchData