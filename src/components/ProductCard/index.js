// Option 1: Default export
import React from 'react';
//import { Link } from 'react-router-dom';
import './index.css';
const ProductCard = ({ productData }) => {
  console.log(productData); // Check the structure of productData
  return (
    <li className="product-item">
    <div className="link-item">

      <img 
        src={productData.image} 
        alt={productData.title} 
        className="thumbnail" // Add a class for styling if needed
      />
      <h2 className='title'>{productData.title}</h2>
      
      <p className="price">Price: ${productData.price}</p>
      <div className="rating-container">
            <p className="rating">Rating: {productData.rating.rate}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
          </div>
    </li>
  );
};

export default ProductCard;

