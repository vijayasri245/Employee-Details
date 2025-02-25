import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const EmployeeForm = ({ isOpen, onClose, addEmployee, editingEmployee, employees }) => {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    id: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    role: "",
    salary: "",
    experience: "Fresher",
    image: null,
    aadharCard: null,
    experienceLetter: null,
    degreeMarksheet: null,
    panCard: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (editingEmployee) {
      setFormData(editingEmployee); // Load data when editing
    } else {
      setFormData(initialFormData);
    }
  }, [editingEmployee, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file && file.type !== "image/jpeg") {
        alert("Only JPG files are allowed!");
        return;
      }
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.id || employees.some((emp) => emp.id === formData.id && emp !== editingEmployee)) {
      alert("Employee ID already exists or is empty! Please enter a unique ID.");
      return;
    }

    addEmployee(formData);
    setFormData(initialFormData); // Reset form after submission
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <span className="close-icon" onClick={onClose}>&times;</span>
      <h2>{editingEmployee ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="row">
          <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
          <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="row">
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
          <input type="text" placeholder="Employee ID" name="id" value={formData.id} onChange={handleChange} required disabled={!!editingEmployee} />
        </div>

        <div className="row">
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div className="row">
          <input type="text" placeholder="Marital Status" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required />
          <input type="text" placeholder="Designation" name="designation" value={formData.designation} onChange={handleChange} required />
        </div>

        <div className="row">
          <input type="text" placeholder="Department" name="department" value={formData.department} onChange={handleChange} required />
          <input type="text" placeholder="Role" name="role" value={formData.role} onChange={handleChange} required />
        </div>

        <div className="row">
          <input type="number" placeholder="Salary" name="salary" value={formData.salary} onChange={handleChange} required />
          <select name="experience" value={formData.experience} onChange={handleChange} required>
            <option value="Fresher">Fresher</option>
            <option value="Experienced">Experienced</option>
          </select>
        </div>

        {formData.experience === "Experienced" && (
          <div className="file-upload">
            <label>Experience Letter (JPG)</label>
            <input type="file" name="experienceLetter" accept=".jpg" onChange={handleChange} required />
          </div>
        )}

        <div className="row">
          <div className="file-upload">
            <label>Upload Image (JPG)</label>
            <input type="file" name="image" accept=".jpg" onChange={handleChange} required />
          </div>
          <div className="file-upload">
            <label>Aadhar Card (JPG)</label>
            <input type="file" name="aadharCard" accept=".jpg" onChange={handleChange} required />
          </div>
        </div>

        <div className="row">
          <div className="file-upload">
            <label>Degree Marksheet (JPG)</label>
            <input type="file" name="degreeMarksheet" onChange={handleChange} required />
          </div>
          <div className="file-upload">
            <label>PAN Card (JPG)</label>
            <input type="file" name="panCard" onChange={handleChange} required />
          </div>
        </div>

        <button type="submit">{editingEmployee ? "Update Employee" : "Submit"}</button>
      </form>
    </Modal>
  );
};

const EmployeeTable = ({ employees, searchQuery, viewEmployee, editEmployee, handleSalary, handleLeave, deleteEmployee }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const filteredEmployees = employees.filter((emp) =>
    emp.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (employee) => {
    setSelectedEmployee(employee);
  };

  const closeView = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="employee-table">
      <table>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Employee ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{employee.id}</td>
              <td>
                {employee.image ? (
                  <img
                    src={URL.createObjectURL(employee.image)}
                    alt="Employee"
                    className="employee-img"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.dob}</td>
              <td>
                <button
                  className="action-btn view-btn"
                  onClick={() => handleView(employee)}
                >
                  View
                </button>
                <button className="action-btn edit-btn" onClick={() => editEmployee(employee)}>Edit</button>
                <button className="action-btn salary-btn" onClick={() => handleSalary(employee)}>Salary</button>
                <button className="action-btn leave-btn" onClick={() => handleLeave(employee)}>Leave</button>
                <button className="action-btn delete-btn" onClick={() => deleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEmployee && (
        <div className="view-card-overlay" onClick={closeView}>
          <div className="view-card" onClick={(e) => e.stopPropagation()}>
            <span className="close-icon" onClick={closeView}>&times;</span>
            <img
              src={selectedEmployee.image ? URL.createObjectURL(selectedEmployee.image) : ""}
              alt="Employee"
              className="view-card-img"
            />
            <h3>{selectedEmployee.name}</h3>
            <table className="view-table">
              <tbody>
                <tr>
                  <td><strong>Employee ID:</strong></td>
                  <td>{selectedEmployee.id}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{selectedEmployee.email}</td>
                </tr>
                <tr>
                  <td><strong>DOB:</strong></td>
                  <td>{selectedEmployee.dob}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by Employee ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    );
};

export { EmployeeForm, EmployeeTable, SearchBar }; // Exporting all components