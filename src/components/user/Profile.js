import React, { useState, useEffect } from 'react';
import { fetchUserProfile } from '../../utils/api';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  const getUserProfile = async () => {
    try {
      const data = await fetchUserProfile();
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user profile', error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  if (!user) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div className="profile-section">
      <h3>User Profile</h3>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
      <p><strong>Booking History:</strong></p>
      <ul>
        {user.bookings &&
          user.bookings.map((booking) => (
            <li key={booking.ID}>
              <p><strong>Court Name:</strong> {booking.courtName}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Price Paid:</strong> ${booking.price}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserProfile;
