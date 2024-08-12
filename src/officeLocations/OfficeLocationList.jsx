import React, { useState, useEffect } from 'react';
import KfgApi from '../api/api';

// This is my OfficeLocationList component. It displays a list of office locations that I used to create a dropdown menu in the EmployeeForm component when signing up a new employee.

function OfficeLocationList() {
    const [officeLocations, setOfficeLocations] = useState([]);

    useEffect(() => {
        async function fetchOfficeLocations() {
            try {
                const locChoices = await KfgApi.getOfficeLocations();
                setOfficeLocations(locChoices);
            } catch (err) {
                console.error("Error fetching office locations", err);
            }
        }
        fetchOfficeLocations();
    }, []);

    return (
        <div>
            <h1>Office Locations</h1>
            <ul>
                {officeLocations.map(office => (
                    <li key={loc}>{loc}</li>
                ))}
            </ul>
        </div>
    );
}

export default OfficeLocationList;