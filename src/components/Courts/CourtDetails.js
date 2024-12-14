import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourtDetails } from '../utils/api.js';

const CourtDetails = () => {
  const { id } = useParams();
  const [court, setCourt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCourtDetails = async () => {
    try {
      const data = await getCourtDetails(id);
      setCourt(data);
    } catch (err) {
      setError('Failed to fetch court details');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourtDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="court-details">
      {court && (
        <>
          <h2>{court.name}</h2>
          <p><strong>Location:</strong> {court.location}</p>
          <p><strong>Price:</strong> ${court.price} per hour</p>
          <p><strong>Available Slots:</strong> {court.availableSlots}</p>
          <p><strong>Amenities:</strong> {court.amenities}</p>

          <button onClick={() => window.location.href = `/book/${court.ID}`}>
            Book This Court
          </button>
        </>
      )}
    </div>
  );
};

export default CourtDetails;
