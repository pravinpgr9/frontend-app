// src/components/EmployeeList.js

import React, { useEffect, useState } from 'react';
import { getEmployees,deleteEmployee } from './api';
import { useNavigate } from 'react-router-dom';
import EditEmployeeForm from './EditEmployeeForm'; // Import EditEmployeeForm

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate(); // Import and initialize useNavigate hook
  const [isEditFormOpen, setIsEditFormOpen] = useState(false); // Track edit form state
  const [selectedEmployee] = useState(null); // Store selected employee for editing

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const handleAddEmployee = () => {
    console.log("handleAddEmployee")
    navigate('/add-employee'); // Redirect to the specified path
  };

  
  const handleEditEmployee = (employeeId) => {
    navigate(`/edit-employee/${employeeId}`); // Navigate to the edit employee page with employee ID
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(employeeId);
        const updatedEmployees = employees.filter((emp) => emp.id !== employeeId);
        setEmployees(updatedEmployees);
      } catch (error) {
        // Handle delete error gracefully
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <div>
      <h1>Employee List</h1>
      <button className="btn btn-primary mb-3" onClick={handleAddEmployee}> {/* Add onClick event handler */}
        Add Employee
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th> 
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Hire Date</th> 
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone_number}</td> 
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>{employee.salary}</td>
              <td>{employee.hire_date}</td> 
              <td>
              <button className="btn btn-sm btn-primary" onClick={() => handleEditEmployee(employee.id)}>
                  Edit
                </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDeleteEmployee(employee.id)}
              >
                Delete
              </button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditFormOpen && (
      <EditEmployeeForm
        employee={selectedEmployee}
        onEditComplete={() => setIsEditFormOpen(false)} // Add callback for closing form
        onUpdateEmployees={(updatedEmployees) => setEmployees(updatedEmployees)} // Pass update function
      />
    )}

    </div>
  );
};

export default EmployeeList;
