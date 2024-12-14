import React, { useState } from 'react';
import { addReview } from '../utils/api.js';

const AddReview = ({ courtID, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReview(courtID, { rating, comment });
      setMessage('Review added successfully');
      setRating(5);
      setComment('');
      onReviewAdded();
    } catch (err) {
      setMessage('Failed to add review');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Comment:
          <textarea
            placeholder="Write your review here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Add Review</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddReview;
