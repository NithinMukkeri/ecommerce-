import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.css';

const SimilarProductItem = props => {
  const { productDetails } = props;
  const { title, brand, imageUrl, rating, price, id } = productDetails;

  return (
    <li className="similar-product-item">
      <Link to={`/products/${id}`} className="similar-product-link">
        <img
          src={imageUrl}
          className="similar-product-img"
          alt={`Similar product: ${title}`}
        />
        <p className="similar-product-title">{title || 'No title available'}</p>
        <p className="similar-products-brand">by {brand || 'Unknown Brand'}</p>
        <div className="similar-product-price-rating-container">
          <p className="similar-product-price">Rs {price || 'N/A'}/-</p>
          <div className="similar-product-rating-container">
            <p className="similar-product-rating">{rating || 'N/A'}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="similar-product-star"
            />
          </div>
        </div>
      </Link>
    </li>
  );
};

SimilarProductItem.propTypes = {
  productDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    brand: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
    rating: PropTypes.number,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default SimilarProductItem;
