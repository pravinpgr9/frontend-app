import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { updateEmployee, getEmployee } from './api';

const EditEmployeeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: '',
    department: '',
    position: '',
    salary: '',
    hire_date: ''
  });

  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEmployee(id);
        const { employee } = response;
        setFormData(employee);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the updateEmployee function with the employee id and updated formData
      console.log("Api function called");
      const response = await updateEmployee(formData.id, formData);
      if (response.status === false) {
        setErrorMessage(response.message);
      } else {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };
  
  const handleRedirectToList = () => {
    navigate('/'); // Navigate to the employee list page
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>First Name:</label>
              <input className="form-control" type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Last Name:</label>
              <input className="form-control" type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Email:</label>
              <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Phone Number:</label>
              <input className="form-control" type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Address:</label>
              <input className="form-control" type="text" name="address" value={formData.address} onChange={handleChange} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Department:</label>
              <input className="form-control" type="text" name="department" value={formData.department} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Position:</label>
              <input className="form-control" type="text" name="position" value={formData.position} onChange={handleChange} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Salary:</label>
              <input className="form-control" type="text" name="salary" value={formData.salary} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Hire Date:</label>
              <input className="form-control" type="text" name="hire_date" value={formData.hire_date} onChange={handleChange} />
            </div>
          </div>
        </div>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        {isSuccess && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="alert alert-success" role="alert">
              Employee updated successfully!
            </div>
            <button className="btn btn-primary ml-2" type="button" onClick={handleRedirectToList}>
              Go to List
            </button>
          </div>
        )}
        {!isSuccess && (
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        )}
      </form>
    </div>
  );
};

export default EditEmployeeForm;
