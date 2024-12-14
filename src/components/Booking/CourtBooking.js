import React, { useState, useEffect } from 'react';

const CourtBooking = () => {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [bookingMessage, setBookingMessage] = useState('');

  const getAllCourts = () => {
    fetch('http://localhost:555/courts')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch courts');
          return [];
        }
      })
      .then((data) => {
        setCourts(data);
      })
      .catch((error) => {
        console.error('Error fetching courts:', error);
      });
  };

  const bookCourt = (courtID) => {
    fetch(`http://localhost:555/courts/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courtID }),
    })
      .then((response) => {
        if (response.ok) {
          setBookingMessage('Court booked successfully!');
          getAllCourts(); 
        } else {
          throw new Error('Failed to book court');
        }
      })
      .catch((error) => {
        setBookingMessage(error.message);
        console.error('Error booking court:', error);
      });
  };

  useEffect(() => {
    getAllCourts();
  }, []);

  return (
    <div className="form-section">
      <h3>Book a Court</h3>
      <button onClick={getAllCourts}>Refresh Courts</button>
      <ul>
        {courts.map((court) => (
          <li key={court.ID}>
            <strong>Court Name:</strong> {court.name} <br />
            <strong>Location:</strong> {court.location} <br />
            <strong>Available Slots:</strong> {court.availableSlots} <br />
            <strong>Price:</strong> ${court.price} per hour <br />
            <button
              onClick={() => {
                setSelectedCourt(court.ID);
                bookCourt(court.ID);
              }}
              disabled={court.availableSlots === 0}
            >
              {court.availableSlots === 0 ? 'Fully Booked' : 'Book Now'}
            </button>
          </li>
        ))}
      </ul>
      {bookingMessage && <p>{bookingMessage}</p>}
    </div>
  );
};

export default CourtBooking;
