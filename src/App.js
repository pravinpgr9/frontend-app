import React from 'react';
import EmployeeList from './components/EmployeeList';
import AddEmployeeForm from './components/AddEmployeeForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import EditEmployeeForm from './components/EditEmployeeForm'; // Import EditEmployeeForm

const App = () => {
  return (

    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route exact path="/" element={<EmployeeList />} /> {/* Use element prop instead of component */}
        <Route path="/add-employee" element={<AddEmployeeForm />} /> {/* Use element prop instead of component */}
        <Route path="/edit-employee/:id" element={<EditEmployeeForm></EditEmployeeForm>} /> {/* Define route for edit employee form */}
      </Routes> {/* Use Routes instead of Switch */}
    </Router>
    
  );
};

export default App;