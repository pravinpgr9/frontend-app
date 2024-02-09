// src/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost/techspawn/index.php?action=view&apiKey=123456789';
const BASE_URL_ADD = 'http://localhost/techspawn/index.php?action=add&apiKey=123456789';
const BASE_URL_GET = 'http://localhost/techspawn/index.php?action=edit&apiKey=123456789&id='; // Modify the base URL for getting an employee
const BASE_URL_UPDATE = 'http://localhost/techspawn/index.php?action=update&apiKey=123456789&id='; // Modify the base URL for updating an employee

const BASE_URL_DELETE = 'http://localhost/techspawn/index.php?action=delete&apiKey=123456789&id='; 

export const getEmployees = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data.employees;
};

export const addEmployee = async (employee) => {
  try {
    const response = await axios.post(BASE_URL_ADD, employee, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  }
};

export const getEmployee = async (employeeId) => {
    console.log("employeeId");
    console.log(employeeId);
  try {
    console.log(`${BASE_URL_GET}${employeeId}`)
    const response = await axios.get(`${BASE_URL_GET}${employeeId}`); // Correctly construct the URL for getting an employee
    return response.data;
  } catch (error) {
    console.error('Error fetching employee data:', error);
    throw error;
  }
};

export const updateEmployee = async (employeeId, updatedEmployeeData) => {
    
  try {
    const response = await axios.put(`${BASE_URL_UPDATE}${employeeId}`, updatedEmployeeData); // Correctly construct the URL for updating an employee
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error updating employee data:', error);
    throw error;
  }
};

export const deleteEmployee = async (employeeId) => {
    try {
      const response = await axios.delete(`${BASE_URL_DELETE}${employeeId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  };