import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import KfgApi from '../api/api';

// This is my EmployeeEdit component. It displays a form for an admin user to edit an employee. The admin may edit the first or last name, email, extension, MS Teams link, department, or office location of the employee. The admin may also delete the employee.

function EmployeeEdit() {
    const { employee_id } = useParams();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        extension: '',
        ms_teams_link: '',
        department: '',
        office_location: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        async function getEmployee() {
            try {
                const employee = await KfgApi.getEmployee(employee_id);
                setFormData({
                    firstname: employee.firstname,
                    lastname: employee.lastname,
                    email: employee.email,
                    extension: employee.extension,
                    ms_teams_link: employee.ms_teams_link,
                    department: employee.department,
                    office_location: employee.office_location,
                });            
        } catch (err) {
            console.error("Error updating employee", err);
        }
    }
    getEmployee();
    }, [employee_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const filteredData = Object.fromEntries(
                Object.entries(formData).filter(([key, value]) => key && value !== undefined && value !== "")
            );
            await KfgApi.updateEmployee(employee_id, filteredData);
            navigate('/employees');
        } catch (err) {
            console.error("Error updating employee", err);
        }
    };

    const handleDelete = async (e) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await KfgApi.deleteEmployee(employee_id);
                navigate('/employees');
            } catch (err) {
                console.error("Error deleting employee", err);
            }
        }
    };

    return (
        <div>
            <h2>Edit Employee</h2>
            <form className="edit-card-body" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstname">First Name:</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder='First Name'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastname">Last Name:</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder='Last Name'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Email'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="extension">Extension:</label>
                    <input
                        type="text"
                        id="extension"
                        name="extension"
                        value={formData.extension}
                        onChange={handleChange}
                        placeholder='Extension'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="ms_teams_link">MS Teams Link:</label>
                    <input
                        type="email"
                        id="ms_teams_link"
                        name="ms_teams_link"
                        value={formData.ms_teams_link}
                        onChange={handleChange}
                        placeholder='MS Teams Link'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="department">Department:</label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder='Department'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="office_location">Office Location:</label>
                    <input
                        type="text"
                        id="office_location"
                        name="office_location"
                        value={formData.office_location}
                        onChange={handleChange}
                        placeholder='Office Location'
                        required
                    />
                </div>
                <button onClick={handleChange} id="edit-button" className="btn btn-primary">Update Employee</button>
                <button onClick={handleDelete} id="edit-button" className="btn btn-danger">Delete Employee</button>
            </form>
            
        </div>
    );
}

export default EmployeeEdit;