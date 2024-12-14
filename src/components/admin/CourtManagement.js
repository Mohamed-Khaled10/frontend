import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getAllCourts, addCourt, updateCourt, deleteCourt } from '../../services/api';
import './CourtManagement.css';

const CourtManagement = () => {
    const [courts, setCourts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingCourt, setEditingCourt] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        price: '',
        status: 'available'
    });

    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    useEffect(() => {
        fetchCourts();
    }, []);

    const fetchCourts = async () => {
        setIsLoading(true);
        try {
            const data = await getAllCourts();
            setCourts(data);
            setError(null);
        } catch (error) {
            setError('Error fetching courts: ' + error.message);
        }
        setIsLoading(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (editingCourt) {
                await updateCourt(editingCourt.id, formData);
            } else {
                await addCourt(formData);
            }
            fetchCourts();
            resetForm();
            setError(null);
        } catch (error) {
            setError(`Error ${editingCourt ? 'updating' : 'adding'} court: ${error.message}`);
        }
        setIsLoading(false);
    };

    const handleDelete = async (courtId) => {
        if (window.confirm('Are you sure you want to delete this court?')) {
            setIsLoading(true);
            try {
                await deleteCourt(courtId);
                fetchCourts();
                setError(null);
            } catch (error) {
                setError('Error deleting court: ' + error.message);
            }
            setIsLoading(false);
        }
    };

    const handleEdit = (court) => {
        setEditingCourt(court);
        setFormData({
            name: court.name,
            type: court.type,
            price: court.price,
            status: court.status
        });
        setShowAddForm(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            type: '',
            price: '',
            status: 'available'
        });
        setEditingCourt(null);
        setShowAddForm(false);
    };

    if (!isAdmin) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="court-management">
            <h1>Court Management</h1>
            {error && <div className="error-message">{error}</div>}
            
            <button 
                className="add-court-btn"
                onClick={() => setShowAddForm(!showAddForm)}
            >
                {showAddForm ? 'Cancel' : 'Add New Court'}
            </button>

            {showAddForm && (
                <form onSubmit={handleSubmit} className="court-form">
                    <h2>{editingCourt ? 'Edit Court' : 'Add New Court'}</h2>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Type:</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="tennis">Tennis</option>
                            <option value="basketball">Basketball</option>
                            <option value="volleyball">Volleyball</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                        >
                            <option value="available">Available</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                    <div className="form-actions">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : (editingCourt ? 'Update Court' : 'Add Court')}
                        </button>
                        {editingCourt && (
                            <button type="button" onClick={resetForm}>
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            )}

            <div className="courts-list">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courts.map(court => (
                            <tr key={court.id}>
                                <td>{court.name}</td>
                                <td>{court.type}</td>
                                <td>${court.price}</td>
                                <td>
                                    <span className={`status-badge ${court.status}`}>
                                        {court.status}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(court)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(court.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CourtManagement;
