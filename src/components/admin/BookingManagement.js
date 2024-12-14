import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getAllBookings, updateBooking } from '../../services/api';
import './BookingManagement.css';

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setIsLoading(true);
        try {
            const data = await getAllBookings();
            setBookings(data);
            setError(null);
        } catch (error) {
            setError('Error fetching bookings: ' + error.message);
        }
        setIsLoading(false);
    };

    const handleStatusChange = async (bookingId, newStatus) => {
        setIsLoading(true);
        try {
            await updateBooking(bookingId, newStatus);
            fetchBookings();
            setError(null);
        } catch (error) {
            setError('Error updating booking status: ' + error.message);
        }
        setIsLoading(false);
    };

    const formatDateTime = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const filteredBookings = filterStatus === 'all'
        ? bookings
        : bookings.filter(booking => booking.status === filterStatus);

    if (!isAdmin) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="booking-management">
            <h1>Booking Management</h1>
            {error && <div className="error-message">{error}</div>}
            
            <div className="filter-section">
                <label>Filter by Status:</label>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="all">All Bookings</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div className="bookings-list">
                <table>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>User</th>
                            <th>Court</th>
                            <th>Date & Time</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map(booking => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.userName}</td>
                                <td>{booking.courtName}</td>
                                <td>{formatDateTime(booking.dateTime)}</td>
                                <td>{booking.duration} hour(s)</td>
                                <td>
                                    <span className={`status-badge ${booking.status}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td>
                                    {booking.status === 'pending' && (
                                        <>
                                            <button
                                                className="confirm-btn"
                                                onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                                disabled={isLoading}
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                className="cancel-btn"
                                                onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                                disabled={isLoading}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                    {booking.status === 'confirmed' && (
                                        <button
                                            className="complete-btn"
                                            onClick={() => handleStatusChange(booking.id, 'completed')}
                                            disabled={isLoading}
                                        >
                                            Mark Complete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingManagement;
