import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [courts, setCourts] = useState([]);
  const [bookings, setBookings] = useState([]);

  const getCourts = () => {
    fetch('http://localhost:555/courts')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch courts');
          return [];
        }
      })
      .then((data) => setCourts(data))
      .catch((error) => console.error('Error fetching courts:', error));
  };

  const getBookings = () => {
    fetch('http://localhost:555/bookings')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch bookings');
          return [];
        }
      })
      .then((data) => setBookings(data))
      .catch((error) => console.error('Error fetching bookings:', error));
  };

  const deleteCourt = (courtId) => {
    fetch(`http://localhost:555/courts/${courtId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete court');
        }
        alert('Court deleted successfully');
        getCourts();
      })
      .catch((error) => alert(error.message));
  };

 
  const cancelBooking = (bookingId) => {
    fetch(`http://localhost:555/bookings/${bookingId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to cancel booking');
        }
        alert('Booking canceled successfully');
        getBookings();
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    getCourts();
    getBookings();
  }, []);

  return (
    <div className="form-section">
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Manage Courts</h3>
        <button onClick={getCourts}>Refresh Courts</button>
        <ul>
          {courts.map((court) => (
            <li key={court.ID}>
              {court.NAME} ({court.LOCATION})
              <button onClick={() => deleteCourt(court.ID)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Manage Bookings</h3>
        <button onClick={getBookings}>Refresh Bookings</button>
        <ul>
          {bookings.map((booking) => (
            <li key={booking.ID}>
              Court: {booking.COURT_NAME} - Date: {booking.DATE}
              <button onClick={() => cancelBooking(booking.ID)}>Cancel Booking</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
