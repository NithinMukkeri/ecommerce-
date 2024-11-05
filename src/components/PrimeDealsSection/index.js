import { Component } from 'react';
//import Loader from 'react-loader-spinner';
import { ThreeDots } from 'react-loader-spinner'; 

import ProductCard from '../ProductCard';

import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const API_URL = 'https://apis.ccbp.in/prime-deals';

class PrimeDealsSection extends Component {
  state = {
    primeDeals: [],
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.getPrimeDeals();
  }

  getPrimeDeals = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });

    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem('jwt_token');
    const options = {
      headers: { Authorization: `Bearer ${jwtToken}` },
      method: 'GET',
    };

    try {
      const response = await fetch(API_URL, options);
      if (response.ok) {
        const fetchedData = await response.json();
        const updatedData = fetchedData.prime_deals.map(product => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }));
        this.setState({ primeDeals: updatedData, apiStatus: apiStatusConstants.success });
      } else {
        this.setState({ apiStatus: apiStatusConstants.failure });
      }
    } catch (error) {
      console.error('Error fetching prime deals:', error);
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  renderPrimeDealsListView = () => {
    const { primeDeals } = this.state;
    return (
      <div>
        <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
        <ul className="products-list">
          {primeDeals.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    );
  };

  renderPrimeDealsFailureView = () => (
    <div className="prime-deals-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
        alt="Register for Prime"
        className="register-prime-img"
      />
      <p>Sorry, we couldn't fetch the deals. Please try again later.</p>
    </div>
  );

  renderLoadingView = () => (
    <div className="primedeals-loader-container">
      <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  render() {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPrimeDealsListView();
      case apiStatusConstants.failure:
        return this.renderPrimeDealsFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  }
}

export default PrimeDealsSection;
