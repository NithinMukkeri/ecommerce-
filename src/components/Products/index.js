import React from 'react';
import AllProductsSection from '../AllProductsSection';
import PrimeDealsSection from '../PrimeDealsSection';
import Header from '../Header';

import './index.css';

const Products = () => (
  <>
    <Header />
    <div className="product-sections" role="main"> {/* Added role for better accessibility */}
      <PrimeDealsSection />
      <AllProductsSection />
    </div>
  </>
);

export default Products;
