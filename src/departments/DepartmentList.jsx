import React, { useState, useEffect } from 'react';
import KfgApi from '../api/api';

function DepartmentList() {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        async function fetchDepartments() {
            try {
                const deptChoices = await KfgApi.getDepartments();
                setDepartments(deptChoices);
            } catch (err) {
                console.error("Error fetching departments", err);
            }
        }
        fetchDepartments();
    }, []);

    return (
        <div>
            <h1>Departments</h1>
            <ul>
                {departments.map(dept => (
                    <li key={dept}>{dept}</li>
                ))}
            </ul>
        </div>
    );
}

export default DepartmentList;