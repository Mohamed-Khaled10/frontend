import React, { useState, useEffect } from 'react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const getMyBookings = () => {
    fetch('http://localhost:555/bookings', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch bookings');
          return [];
        }
      })
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  return (
    <div className="form-section">
      <h3>My Bookings</h3>
      <button onClick={getMyBookings}>Refresh Bookings</button>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.ID}>
            <strong>Court Name:</strong> {booking.courtName} <br />
            <strong>Location:</strong> {booking.location} <br />
            <strong>Date:</strong> {booking.date} <br />
            <strong>Time:</strong> {booking.time} <br />
            <strong>Price Paid:</strong> ${booking.price} <br />
          </li>
        ))}
      </ul>
      {bookings.length === 0 && <p>You have no bookings yet.</p>}
    </div>
  );
};

export default MyBookings;
