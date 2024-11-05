import './index.css';

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-found-heading">Page Not Found</h1>
    <img
      src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
      alt="Illustration indicating the page is not found"
      className="not-found-img"
    />
    <p className="not-found-description">
      Sorry, the page you are looking for does not exist. 
      Please check the URL or return to the homepage.
    </p>
    <a href="/" className="back-home-link">Go to Home</a>
  </div>
);

export default NotFound;
