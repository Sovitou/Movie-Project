import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",

  fontSize: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};
const textStyle = {
  lineHeight: "1",
  margin: "0",
};

const StarRating = ({ maxRating }) => {
  const [rating, setRating] = useState(0);
  const [temprating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
  }
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            fullStar={temprating ? temprating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
          />
        ))}
      </div>
      <p style={textStyle}>{rating || temprating || ""}</p>
    </div>
  );
};

const starStyle = {
  width: "24px",
  height: "24px",
  diplay: "block",
  cursor: "pointer",
};

export function Star({ onRate, fullStar, onHoverIn, onHoverOut }) {
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {fullStar ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#FFD700"
          stroke="#FFD700"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69l3.387.258c.958.071 1.353 1.291.628 1.818l-2.421 2.116a1 1 0 00-.285.94l.72 3.278c.189.868-.748 1.508-1.497 1.042l-2.839-2.072a1 1 0 00-1.149 0l-2.838 2.072c-.749.466-1.686-.174-1.497-1.042l.72-3.278a1 1 0 00-.285-.94l-2.42-2.116c-.725-.527-.33-1.747.628-1.818l3.388-.258a1 1 0 00.951-.69l1.071-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69l3.387.258c.958.071 1.353 1.291.628 1.818l-2.421 2.116a1 1 0 00-.285.94l.72 3.278c.189.868-.748 1.508-1.497 1.042l-2.839-2.072a1 1 0 00-1.149 0l-2.838 2.072c-.749.466-1.686-.174-1.497-1.042l.72-3.278a1 1 0 00-.285-.94l-2.42-2.116c-.725-.527-.33-1.747.628-1.818l3.388-.258a1 1 0 00.951-.69l1.071-3.292z"
          />
        </svg>
      )}
    </span>
  );
}
export default StarRating;
