import React, { useState } from 'react';
import { addCourt } from '../utils/api.js';

const AddCourt = () => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    price: '',
    availableSlots: '',
    amenities: ''
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addCourt(form);
      setMessage('Court added successfully');
      setForm({
        name: '',
        location: '',
        price: '',
        availableSlots: '',
        amenities: ''
      });
    } catch (err) {
      setMessage('Failed to add court');
    }
  };

  return (
    <div className="add-court">
      <h2>Add New Court</h2>
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
        <button type="submit">Add Court</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCourt;
