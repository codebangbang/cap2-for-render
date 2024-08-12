import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import KfgApi from "../api/api";
import "./AdminDashboard.css";

// This component is the Admin Dashboard. It displays a list of employees and skills and allows an admin to add, edit, or delete employees and skills.

function AdminDashboard() {
    const [employees, setEmployees] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // console.log("Fetching Employees...")
                const fetchedEmployees = await KfgApi.getEmployees();
                // console.log("Fetched employees:", fetchedEmployees);

                // console.log("Fetching Skills...")
                const fetchedSkills = await KfgApi.getSkills();
                // console.log("Fetched skills:", fetchedSkills);
                setEmployees(fetchedEmployees);
                setSkills(fetchedSkills);
            } catch (err) {
                console.error("Error fetching data", err);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="section mt-4">
                <h1>Admin Dashboard</h1>             
            </div>
            <div className="section mt-4">
                <h2>Employees</h2>
                <Link className="dashboard-add" to="/employees/new">Add New Employee</Link>
                <ul className="list-unstyled">
                    {employees.map(emp => (
                        <li key={emp.employee_id} className="mb-2">
                            <div className="row align-items-center">
                                <div className="col-md-6 text-end">
                                    {emp.firstname} {emp.lastname}
                                </div>
                                <div className="col-md-2">
                                    <Link className="btn btn-xs" to={`/employees/${emp.employee_id}/edit`}> Edit</Link>
                                </div>
                                <div className="col-md-2">
                                    <Link className="btn btn-xs" to={`/employees/${emp.employee_id}/edit`}> Delete</Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="section mt-4">
                <h2>Skills</h2>
                <Link className="dashboard-add" to="/skills/new">Add New Skill</Link>
                <ul className="list-unstyled">
                    {skills.map(skill => (
                        <li key={skill.skill_id} className="mb-2">
                            <div className="row align-items-center">
                                <div className="col-md-6 text-end">
                                    {skill.skill_name}
                                </div>
                            <div className="col-2">
                                <Link className="btn btn-xs" to ={`/skills/${skill.skill_id}/edit`}> Edit</Link>
                            </div>
                            <div className="col-2">
                                <Link className="btn btn-xs" to ={`/skills/${skill.skill_id}/edit`}> Delete</Link>
                            </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdminDashboard;