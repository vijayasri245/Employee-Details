import React, { useState } from "react";
import { EmployeeForm, EmployeeTable, SearchBar } from './components/EmployeePage';

function App() {
    const [employees, setEmployees] = useState([]); // Initially empty
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const addEmployee = (newEmployee) => {
        if (editingEmployee) {
            setEmployees(employees.map(emp => emp.id === newEmployee.id ? newEmployee : emp));
            setEditingEmployee(null);
        } else {
            setEmployees([...employees, newEmployee]);
        }
    };

    const editEmployee = (employee) => {
        setEditingEmployee(employee);
        setIsModalOpen(true);
    };

    const deleteEmployee = (employeeId) => {
        setEmployees(employees.filter((employee) => employee.id !== employeeId));
    };

    const handleSalary = (employee) => {
        alert("salary function called for employee: " + employee.name);
    };

    const handleLeave = (employee) => {
        alert("leave function called for employee: " + employee.name);
    };

    return (
        <div className="app">
            <div className="top-bar">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <button className="add-btn" onClick={() => setIsModalOpen(true)}>Add Employee</button>
            </div>
            <EmployeeTable
                employees={employees}
                searchQuery={searchQuery}
                editEmployee={editEmployee}
                deleteEmployee={deleteEmployee}
                handleSalary={handleSalary}
                handleLeave={handleLeave}
            />
            <EmployeeForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                addEmployee={addEmployee}
                editingEmployee={editingEmployee}
                employees={employees}
            />
        </div>
    );
}

export default App;