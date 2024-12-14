import React, { useState } from 'react';
import { addCourt } from '../../services/api';
import './AddCourts.css';

const AddCourts = () => {
    const [courtData, setCourtData] = useState({
        name: '',
        sport_type: 'Football Court',
        location: '',
        available_hours: '',
        price: '',
        description: '',
        phonenum: '',
        court_amenities: '',
        picture_url: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourtData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedData = {
                ...courtData,
                price: parseFloat(courtData.price),
                court_amenities: courtData.court_amenities || 'None',
                picture_url: courtData.picture_url || ''
            };
            
            console.log('Form data before submission:', formattedData);
            const response = await addCourt(formattedData);
            console.log('Response from server:', response);
            
            setMessage('Court added successfully!');
            setError('');
            
            setCourtData({
                name: '',
                sport_type: 'Football Court',
                location: '',
                available_hours: '',
                price: '',
                description: '',
                phonenum: '',
                court_amenities: '',
                picture_url: ''
            });
        } catch (err) {
            console.error('Detailed error:', err);
            setError(err.message || 'Failed to add court. Please try again.');
            setMessage('');
            console.error('Error adding court:', err);
        }
    };

    return (
        <div className="add-courts-container">
            <div className="add-courts-form">
                <h2>Add New Football Court</h2>
                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Court Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={courtData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter court name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={courtData.location}
                            onChange={handleChange}
                            required
                            placeholder="Enter court location"
                        />
                    </div>
                    <div className="form-group">
                        <label>Contact Phone Number:</label>
                        <input
                            type="tel"
                            name="phonenum"
                            value={courtData.phonenum}
                            onChange={handleChange}
                            required
                            placeholder="Enter contact phone number"
                        />
                    </div>
                    <div className="form-group">
                        <label>Available Hours:</label>
                        <input
                            type="text"
                            name="available_hours"
                            value={courtData.available_hours}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 9:00-17:00"
                        />
                    </div>
                    <div className="form-group">
                        <label>Price per Hour:</label>
                        <input
                            type="number"
                            name="price"
                            value={courtData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            placeholder="Enter price per hour"
                        />
                    </div>
                    <div className="form-group">
                        <label>Court Amenities:</label>
                        <input
                            type="text"
                            name="court_amenities"
                            value={courtData.court_amenities}
                            onChange={handleChange}
                            placeholder="e.g., Lighting, Changing Rooms, Parking"
                        />
                    </div>
                    <div className="form-group">
                        <label>Picture URL (Optional):</label>
                        <input
                            type="text"
                            name="picture_url"
                            value={courtData.picture_url}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={courtData.description}
                            onChange={handleChange}
                            placeholder="Enter court description"
                            rows="4"
                        />
                    </div>
                    <button type="submit">Add Court</button>
                </form>
            </div>
        </div>
    );
};

export default AddCourts;
