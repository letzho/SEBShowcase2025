import './StarRating.css';

function StarRating({ value, onChange, maxStars = 4 }) {
  const handleClick = (starValue) => {
    onChange(starValue);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4].map((star) => (
        <button
          key={star}
          className="star-btn"
          onClick={() => handleClick(star)}
          type="button"
        >
          <svg
            className="star-svg"
            fill={star <= value ? '#f59e0b' : '#cbd5e1'}
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default StarRating;

