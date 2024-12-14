import React, { useState, useEffect } from 'react';
import { getReviews } from '../utils/api.js';

const ReviewsList = ({ courtID }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const data = await getReviews(courtID);
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [courtID]);

  return (
    <div>
      <h4>Reviews</h4>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review-card">
            <p><strong>Rating:</strong> {review.rating} ⭐</p>
            <p><strong>Comment:</strong> {review.comment}</p>
            <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewsList;
