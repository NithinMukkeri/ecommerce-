import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// import Loader from 'react-loader-spinner';
import { ThreeDots } from 'react-loader-spinner';

import FiltersGroup from '../FiltersGroup';
import ProductCard from '../ProductCard';
import ProductsHeader from '../ProductsHeader';

import './index.css';

const categoryOptions = [
  { name: 'Clothing', categoryId: '1' },
  { name: 'Electronics', categoryId: '2' },
  { name: 'Appliances', categoryId: '3' },
  { name: 'Grocery', categoryId: '4' },
  { name: 'Toys', categoryId: '5' },
];

const sortbyOptions = [
  { optionId: 'PRICE_HIGH', displayText: 'Price (High-Low)' },
  { optionId: 'PRICE_LOW', displayText: 'Price (Low-High)' },
];

const ratingsList = [
  { ratingId: '4', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png' },
  { ratingId: '3', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png' },
  { ratingId: '2', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png' },
  { ratingId: '1', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png' },
];

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const AllProductsSection = () => {
  const [productsList, setProductsList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [activeOptionId, setActiveOptionId] = useState(sortbyOptions[0].optionId);
  const [activeCategoryId, setActiveCategoryId] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [activeRatingId, setActiveRatingId] = useState('');

  const fetchProducts = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress);
    
    let apiUrl = `https://fakestoreapi.com/products`;
    
    // You can filter products from the response client-side since the API doesn't support query parameters
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        
        // Here you can filter products based on the activeOptionId, activeCategoryId, searchInput, and activeRatingId
        const filteredProducts = data.filter(product => {
          const matchesCategory = activeCategoryId ? product.category === activeCategoryId : true;
          const matchesRating = activeRatingId ? product.rating >= activeRatingId : true;
          const matchesSearch = searchInput ? product.title.toLowerCase().includes(searchInput.toLowerCase()) : true;

          return matchesCategory && matchesRating && matchesSearch;
        });

        // Sorting logic based on activeOptionId
        const sortedProducts = filteredProducts.sort((a, b) => {
          if (activeOptionId === 'PRICE_HIGH') {
            return b.price - a.price;
          } else {
            return a.price - b.price;
          }
        });

        setProductsList(sortedProducts);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch {
      setApiStatus(apiStatusConstants.failure);
    }
  }, [activeOptionId, activeCategoryId, searchInput, activeRatingId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const renderLoadingView = () => (
    <div className="products-loader-container">
      <ThreeDots color="#0b69ff" height={50} width={50} />
    </div>
  );

  const renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  const renderProductsListView = () => {
    const shouldShowProductsList = productsList.length > 0;
    return shouldShowProductsList ? (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={setActiveOptionId}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    );
  };

  const renderAllProducts = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductsListView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  const clearFilters = () => {
    setSearchInput('');
    setActiveCategoryId('');
    setActiveRatingId('');
    fetchProducts();
  };

  return (
    <div className="all-products-section">
      <FiltersGroup
        searchInput={searchInput}
        categoryOptions={categoryOptions}
        ratingsList={ratingsList}
        changeSearchInput={setSearchInput}
        enterSearchInput={fetchProducts}
        activeCategoryId={activeCategoryId}
        activeRatingId={activeRatingId}
        changeCategory={setActiveCategoryId}
        changeRating={setActiveRatingId}
        clearFilters={clearFilters}
      />
      {renderAllProducts()}
    </div>
  );
};

export default AllProductsSection;
