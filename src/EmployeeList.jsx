import React, { useState } from "react";
import './App.css'; 

const EmployeeList = ({ data, setData, handleDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [updatedEmployeeData, setUpdatedEmployeeData] = useState({ firstName: "", lastName: "", age: "" });

  const itemsPerPage = 8;

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEditClick = (employee) => {
    setEditingEmployeeId(employee.id);
    setUpdatedEmployeeData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      age: employee.age,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployeeData({ ...updatedEmployeeData, [name]: value });
  };

  const handleSave = () => {
    if (!updatedEmployeeData.firstName || !updatedEmployeeData.lastName || !updatedEmployeeData.age) {
      alert("All fields are required.");
      return;
    }

    const updatedData = data.map((employee) =>
      employee.id === editingEmployeeId ? { ...employee, ...updatedEmployeeData } : employee
    );

    setData(updatedData);

    setEditingEmployeeId(null);
    setUpdatedEmployeeData({ firstName: "", lastName: "", age: "" });
  };

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>
      {data.length === 0 ? (
        <p>No employees to display</p>
      ) : (
        <>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  {editingEmployeeId === employee.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="firstName"
                          value={updatedEmployeeData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="lastName"
                          value={updatedEmployeeData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="age"
                          value={updatedEmployeeData.age}
                          onChange={handleInputChange}
                          required
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.age}</td>
                    </>
                  )}
                  <td>
                    {editingEmployeeId === employee.id ? (
                      <>
                        <button className="btn btn-success" onClick={handleSave}>
                          Save
                        </button>
                        <button className="btn btn-secondary" onClick={() => setEditingEmployeeId(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-primary" onClick={() => handleEditClick(employee)}>
                          Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(employee.id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-controls">
            <button
              className="btn btn-secondary"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-secondary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
