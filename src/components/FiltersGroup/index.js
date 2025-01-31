import { BsSearch } from 'react-icons/bs';
import './index.css';

const FiltersGroup = ({
  ratingsList,
  categoryOptions,
  activeRatingId,
  activeCategoryId,
  searchInput,
  changeRating,
  changeCategory,
  enterSearchInput,
  changeSearchInput,
  clearFilters,
}) => {
  
  const renderRatingsFiltersList = () => {
    return ratingsList.map(rating => {
      const ratingClassName =
        activeRatingId === rating.ratingId ? 'and-up active-rating' : 'and-up';

      const onClickRatingItem = () => changeRating(rating.ratingId);

      return (
        <li className="rating-item" key={rating.ratingId} onClick={onClickRatingItem}>
          <img
            src={rating.imageUrl}
            alt={`rating ${rating.ratingId}`}
            className="rating-img"
          />
          <p className={ratingClassName}>& up</p>
        </li>
      );
    });
  };

  const renderCategoriesList = () => {
    return categoryOptions.map(category => {
      const isActive = category.categoryId === activeCategoryId;
      const categoryClassName = isActive
        ? 'category-name active-category-name'
        : 'category-name';

      const onClickCategoryItem = () => changeCategory(category.categoryId);

      return (
        <li className="category-item" key={category.categoryId} onClick={onClickCategoryItem}>
          <p className={categoryClassName}>{category.name}</p>
        </li>
      );
    });
  };

  const onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      enterSearchInput();
    }
  };

  const onChangeSearchInput = event => {
    changeSearchInput(event.target.value);
  };

  return (
    <div className="filters-group-container">
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>
      <div>
        <h1 className="category-heading">Category</h1>
        <ul className="categories-list">{renderCategoriesList()}</ul>
      </div>
      <div>
        <h1 className="rating-heading">Rating</h1>
        <ul className="ratings-list">{renderRatingsFiltersList()}</ul>
      </div>
      <button type="button" className="clear-filters-btn" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default FiltersGroup;
