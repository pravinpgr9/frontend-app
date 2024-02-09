// DeleteEmployee.js
import React from 'react';
import { deleteEmployee } from './api'; // You need to implement the API function

const DeleteEmployee = ({ id, onDelete }) => {
  const handleDelete = async () => {
    await deleteEmployee(id);
    onDelete();
  };

  return (
    <div>
      <p>Are you sure you want to delete this employee?</p>
      <button onClick={handleDelete}>Yes</button>
      <button onClick={onDelete}>No</button>
    </div>
  );
};

export default DeleteEmployee;
