import React, { useState, useEffect } from 'react';
import { getCourtDetails, updateCourt } from '../utils/api.js';

const EditCourt = ({ courtID }) => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    price: '',
    availableSlots: '',
    amenities: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCourtDetails = async () => {
      try {
        const court = await getCourtDetails(courtID);
        setForm({
          name: court.name,
          location: court.location,
          price: court.price,
          availableSlots: court.availableSlots,
          amenities: court.amenities
        });
      } catch (err) {
        setMessage('Failed to fetch court details');
      }
    };

    fetchCourtDetails();
  }, [courtID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCourt(courtID, form);
      setMessage('Court updated successfully');
    } catch (err) {
      setMessage('Failed to update court');
    }
  };

  return (
    <div className="edit-court">
      <h2>Edit Court</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Court Name"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          value={form.location}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          placeholder="Price per Hour"
          name="price"
          value={form.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          placeholder="Available Slots"
          name="availableSlots"
          value={form.availableSlots}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          placeholder="Amenities"
          name="amenities"
          value={form.amenities}
          onChange={handleInputChange}
        />
        <button type="submit">Update Court</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditCourt;
