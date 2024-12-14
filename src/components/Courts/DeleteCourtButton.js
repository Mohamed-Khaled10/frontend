import React, { useState } from 'react';
import { deleteCourt } from '../utils/api.js';

const DeleteCourtButton = ({ courtID, onCourtDeleted }) => {
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      await deleteCourt(courtID);
      setMessage('Court deleted successfully');
      onCourtDeleted(courtID);
    } catch (err) {
      setMessage('Failed to delete court');
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Court</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteCourtButton;
