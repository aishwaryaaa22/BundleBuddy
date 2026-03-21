import React , {useContext} from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from './ShopContext';
import Breadcrum from './Breadcrum';

const Product = (props) => {
  const { data } = useContext(ShopContext);
  const{productId}=useParams();
  const product=data.find((e)=>e.id===Number(productId))
  return (
    <div className="Productdisplay">
        <Breadcrum product={product}/>
    </div>
  )
}

export default Product