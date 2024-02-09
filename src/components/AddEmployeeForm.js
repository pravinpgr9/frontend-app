import React, { useState } from "react";
import { addEmployee } from "./api";
import { useNavigate } from "react-router-dom";

const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    department: "",
    position: "",
    salary: "",
    hire_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Use a single state variable for error handling
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader
    setError(null); // Clear any previous errors

    try {
      // Validate required fields before calling the API
      const requiredFields = ["first_name", "last_name", "email"];
      const missingFields = requiredFields.filter(field => !formData[field]);
      if (missingFields.length > 0) {
        throw new Error(`Please provide the following required fields: ${missingFields.join(", ")}`);
      }

      await addEmployee(formData);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address: "",
        department: "",
        position: "",
        salary: "",
        hire_date: "",
      });
      navigate("/"); // Redirect to list page upon successful addition
    } catch (error) {
      // Handle both custom errors (from validation) and API errors
      if (error.message) {
        setError(error.message);
      } else {
        setError("An error occurred while adding the employee. Please try again.");
      }
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleListEmployee = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Add Employee</h2>
      <button className="btn btn-primary mb-3" onClick={handleListEmployee}>
        Employee List
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <input
              type="text"
              className="form-control"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="position" className="form-label">
              Position
            </label>
            <input
              type="text"
              className="form-control"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="hireDate" className="form-label">
              Hire Date
            </label>
            <input
              type="date"
              className="form-control"
              id="hireDate"
              name="hire_date"
              value={formData.hire_date}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
