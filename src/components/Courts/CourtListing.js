import React, { useState, useEffect } from 'react';
import { getCourts, addCourt } from '../../services/api';
import './CourtListing.css';

const CourtListing = () => {
    const [courts, setCourts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [isAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
    const [newCourt, setNewCourt] = useState({
        name: '',
        location: '',
        price: '',
        sport_type: 'Football',
        phonenum: '',
        court_amenities: '',
        description: '',
        available_hours: ''
    });

    useEffect(() => {
        loadCourts();
    }, []);

    const loadCourts = async () => {
        try {
            const data = await getCourts();
            setCourts(data);
            setError('');
        } catch (err) {
            setError('Failed to load courts. Please try again.');
            console.error('Error loading courts:', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourt(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addCourt(newCourt);
            setNewCourt({
                name: '',
                location: '',
                price: '',
                sport_type: 'Football',
                phonenum: '',
                court_amenities: '',
                description: '',
                available_hours: ''
            });
            loadCourts();
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to add court');
        }
    };

    const filteredCourts = courts.filter(court =>
        court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        court.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="courts-container">
            <div className="courts-header">
                <h1>Browse Available Football Courts</h1>
            </div>

            <div className="search-refresh-container">
                <input
                    type="text"
                    placeholder="Search by name or location..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="refresh-button" onClick={loadCourts}>
                    Refresh
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {isAdmin && (
                <form className="admin-form" onSubmit={handleSubmit}>
                    <h2>Add New Court</h2>
                    <div className="form-group">
                        <label>Court Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={newCourt.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={newCourt.location}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price per Hour:</label>
                        <input
                            type="number"
                            name="price"
                            value={newCourt.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input
                            type="tel"
                            name="phonenum"
                            value={newCourt.phonenum}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Available Hours:</label>
                        <input
                            type="text"
                            name="available_hours"
                            value={newCourt.available_hours}
                            placeholder="e.g., 8:00-23:00"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Amenities:</label>
                        <input
                            type="text"
                            name="court_amenities"
                            value={newCourt.court_amenities}
                            placeholder="e.g., Lighting, Parking, Changing Rooms"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={newCourt.description}
                            onChange={handleInputChange}
                            rows="3"
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Add Court
                    </button>
                </form>
            )}

            <div className="courts-grid">
                {filteredCourts.map(court => (
                    <div key={court.id} className="court-card">
                        <div className="court-content">
                            <h2 className="court-name">{court.name}</h2>
                            <div className="court-info">
                                <p><strong>Location:</strong> {court.location}</p>
                                <p><strong>Price:</strong> ${court.price} per hour</p>
                                <p><strong>Available Hours:</strong> {court.available_hours}</p>
                                <p><strong>Contact:</strong> {court.phonenum}</p>
                                {court.description && (
                                    <p><strong>Description:</strong> {court.description}</p>
                                )}
                            </div>
                            {court.court_amenities && (
                                <div className="amenities-list">
                                    {court.court_amenities.split(',').map((amenity, index) => (
                                        <span key={index} className="amenity-tag">
                                            {amenity.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <button className="book-button">Book Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourtListing;
