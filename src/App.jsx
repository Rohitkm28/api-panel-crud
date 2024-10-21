import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { EmployeeData } from "./EmployeeData";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import Dashboard from "./Dashboard"; 

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const employeeToEdit = data.find((employee) => employee.id === id);
    if (employeeToEdit) {
      setId(id);
      setIsUpdate(true);
      setEditValues(employeeToEdit);
    }
  };

  const handleDelete = (id) => {
    if (id > 0 && window.confirm("Are you sure to delete this item?")) {
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link className="nav-link" to="/">Dashboard</Link>
          <Link className="nav-link" to="/employees">Employee List</Link>
          <Link className="nav-link" to="/form">Add Employee</Link>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeList data={data} setData={setData} handleDelete={handleDelete} />} />
            <Route path="/form" element={<EmployeeForm data={data} setData={setData} id={id} setId={setId} isUpdate={isUpdate} setIsUpdate={setIsUpdate} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
