import React from 'react'

const Breadcrum=(props)=> {
    const{product}=props;
  return (
    <div className='breadcrum'>
        Home SHOP {product.Category} {product.name}
    </div>
  )
}

export default Breadcrum