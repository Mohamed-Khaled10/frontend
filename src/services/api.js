const API_BASE_URL = 'http://localhost:2508';


const getCsrfToken = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/csrf-token`, {
            credentials: 'include'
        });
        const data = await response.json();
        return data.csrfToken;
    } catch (error) {
        console.error('Error getting CSRF token:', error);
        throw error;
    }
};


const getCommonOptions = async (method = 'GET', body = null) => {
    const options = {
        method,
        credentials: 'include', 
        headers: {
            'Content-Type': 'application/json',
        }
    };

  
    if (method !== 'GET') {
        const csrfToken = await getCsrfToken();
        options.headers['X-CSRF-Token'] = csrfToken;
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    return options;
};


export const loginUser = async (email, password) => {
    try {
        const options = await getCommonOptions('POST', { email, password });
        const response = await fetch(`${API_BASE_URL}/user/login`, options);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const loginAdmin = async (email, password) => {
    try {
        const options = await getCommonOptions('POST', { email, password });
        const response = await fetch(`${API_BASE_URL}/admin/login`, options);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Admin login failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Admin login error:', error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const options = await getCommonOptions('POST', userData);
        const response = await fetch(`${API_BASE_URL}/user/register`, options);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Registration failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};


export const addCourt = async (courtData) => {
    try {
        const options = await getCommonOptions('POST', courtData);
        const response = await fetch(`${API_BASE_URL}/admin/courts`, options);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to add court');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding court:', error);
        throw error;
    }
};


export const getCourts = async () => {
    try {
        const options = await getCommonOptions('GET');
        const response = await fetch(`${API_BASE_URL}/courts`, options);
        if (!response.ok) {
            throw new Error('Failed to fetch courts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching courts:', error);
        throw error;
    }
};

export const getCourtsWithToken = async () => {
    const options = await getCommonOptions('GET');
    options.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const response = await fetch(`${API_BASE_URL}/courts`, options);
    if (!response.ok) {
        throw new Error('Failed to fetch courts');
    }
    return await response.json();
};


export const createBooking = async (bookingData) => {
    try {
        const options = await getCommonOptions('POST', bookingData);
        options.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        const response = await fetch(`${API_BASE_URL}/bookings`, options);
        if (!response.ok) {
            throw new Error('Failed to create booking');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

export const getUserBookings = async () => {
    try {
        const options = await getCommonOptions('GET');
        options.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        const response = await fetch(`${API_BASE_URL}/bookings/user`, options);
        if (!response.ok) {
            throw new Error('Failed to fetch user bookings');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        throw error;
    }
};

export const cancelBooking = async (bookingId) => {
    try {
        const options = await getCommonOptions('DELETE');
        options.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, options);
        if (!response.ok) {
            throw new Error('Failed to cancel booking');
        }
        return await response.json();
    } catch (error) {
        console.error('Error canceling booking:', error);
        throw error;
    }
};
