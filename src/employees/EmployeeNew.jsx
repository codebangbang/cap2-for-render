import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KfgApi from '../api/api';
import * as Yup from 'yup';
import './EmployeeNew.css';

//  This is my EmployeeNew component. It is a form that allows an admin to create a new employee. The form includes fields for the employee's first name, last name, email, extension, MS Teams link, department, and office location. The form also includes validation for each field. The form is submitted to the API when the admin clicks the submit button. If the form is successfully submitted, the admin is redirected to the employees page.

const validationSchema = Yup.object().shape({
    firstname: Yup.string().min(1).max(50).required("First name is required"),
    lastname: Yup.string().min(1).max(50).required("Last name is required"),
    email: Yup.string().email().required("Email is required"),
    extension: Yup.number().integer().min(0).max(9999).required("Extension is required"),
    ms_teams_link: Yup.string().email().required("MS Teams link is required"),
    department: Yup.string().min(1).max(50).required("Department is required"),
    office_location: Yup.string().min(1).max(50).required("Office location is required"),
});

function EmployeeNew() {
    const [departments, setDepartments] = useState([]);
    const [officeLocations, setOfficeLocations] = useState([]);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        extension: "",
        ms_teams_link: "",
        department: "",
        office_location: "",
    });
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchChoices() {
            try {
                const deptChoices = await KfgApi.getDepartments();
                const locChoices = await KfgApi.getOfficeLocations();
    
                // console.log("Department API Response", deptChoices);
                // console.log("Office Location API Response", locChoices);

                if (Array.isArray(deptChoices)) {
                    // console.log("Setting departments", deptChoices);
                    setDepartments(deptChoices);
                } else {
                    // console.log("No valid departments data received");
                }
    
                if (Array.isArray(locChoices)) {
                    // console.log("Setting Office Location", locChoices);
                    setOfficeLocations(locChoices);
                } else {
                    // console.log("No valid officeLocations data received");
                }
            } catch (err) {
                console.error("Error fetching choices", err);
            }
        }
        fetchChoices();
    }, []);

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
        const dataToSend = { ...formData, extension: parseInt(formData.extension, 10) };
        await validationSchema.validate(dataToSend, { abortEarly: false });
        await KfgApi.createEmployee(dataToSend);
        navigate('/employees');
    } catch (err) {
        if (err.name === "ValidationError") {
            const validationErrors = {};
            err.inner.forEach(error => {
                validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
        } else {
            console.error("Error creating employee", err);
        }
    }
};

// console.log("Current Departments State:", departments);
// console.log("Current Office Locations State:", officeLocations);


    return (
        <div className="employee-new-container">
            <h2 className="text-center">New Employee</h2>
            <form onSubmit={handleSubmit} className="employee-form">
                <label htmlFor="employee_name">Employee Name</label>
                <input  
                    id="firstname"
                    name="firstname"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className="form-control"
                />
                {errors.firstname && <div className="alert alert-danger">{errors.firstname}</div>}
                <input  
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className="form-control"
                />
                {errors.lastname && <div className="alert alert-danger">{errors.lastname}</div>}
                <input  
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="form-control"
                />
                {errors.email && <div className="alert alert-danger">{errors.email}</div>}
                <input  
                    name="extension"
                    value={formData.extension}
                    onChange={handleChange}
                    placeholder="Extension"
                    required
                    className="form-control"
                />
                {errors.extension && <div className="alert alert-danger">{errors.extension}</div>}
                <input  
                    name="ms_teams_link"
                    value={formData.ms_teams_link}
                    onChange={handleChange}
                    placeholder="Teams Link (email)"
                    required
                    className="form-control"
                />
                {errors.ms_teams_link && <div className="alert alert-danger">{errors.ms_teams_link}</div>}
                
                <select  
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="form-control"
                >
                    <option value="">Select Department</option>
                    {departments.length > 0 ? (
                        departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                    ))
                ) : (
                    <option value="">No Departments Available</option>
                )}
                </select>
                {errors.department && <div className="alert alert-danger">{errors.department}</div>}
                
                <select  
                    name="office_location"
                    value={formData.office_location}
                    onChange={handleChange}
                    required
                    className="form-control"
                >
                    <option value="">Select Office Location</option>
                    {officeLocations.length > 0 ? (
                        officeLocations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                    ))
                    ) : (
                        <option value="">No Office Locations Available</option>
                    )}
                </select>
                {errors.office_location && <div className="alert alert-danger">{errors.office_location}</div>}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default EmployeeNew;