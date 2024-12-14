import React, { useState, useEffect } from 'react';

const ManageCourts = () => {
  const [courts, setCourts] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', location: '' });
  const [isEditing, setIsEditing] = useState(false);

  
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

  
  const addCourt = () => {
    fetch('http://localhost:555/courts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, location: form.location }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add court');
        }
        alert('Court added successfully');
        setForm({ id: '', name: '', location: '' });
        getCourts(); 
      })
      .catch((error) => alert(error.message));
  };

  
  const editCourt = () => {
    fetch(`http://localhost:555/courts/${form.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, location: form.location }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update court');
        }
        alert('Court updated successfully');
        setForm({ id: '', name: '', location: '' });
        setIsEditing(false);
        getCourts(); 
      })
      .catch((error) => alert(error.message));
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
        getCourts(); // Refresh courts
      })
      .catch((error) => alert(error.message));
  };

  
  const populateForm = (court) => {
    setForm({ id: court.ID, name: court.NAME, location: court.LOCATION });
    setIsEditing(true);
  };

  useEffect(() => {
    getCourts();
  }, []);

  return (
    <div className="form-section">
      <h2>Manage Courts</h2>
      <div>
        <h3>{isEditing ? 'Edit Court' : 'Add Court'}</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isEditing ? editCourt() : addCourt();
          }}
        >
          {isEditing && (
            <input
              type="hidden"
              value={form.id}
              readOnly
            />
          )}
          <input
            type="text"
            placeholder="Court Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <br />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
          <br />
          <button type="submit">{isEditing ? 'Update Court' : 'Add Court'}</button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setForm({ id: '', name: '', location: '' });
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
      <div>
        <h3>Existing Courts</h3>
        <ul>
          {courts.map((court) => (
            <li key={court.ID}>
              {court.NAME} ({court.LOCATION})
              <button onClick={() => populateForm(court)}>Edit</button>
              <button onClick={() => deleteCourt(court.ID)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageCourts;
