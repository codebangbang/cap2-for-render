import React, { useState, useEffect } from 'react';
import SearchForm from '../auth/SearchForm';
import KfgApi from '../api/api';
import EmployeeCard from './EmployeeCard';
import LoadingSpinner from '../common/LoadingSpinner';

//  This is my EmployeeList component. It displays a list of employees. The list is generated from the search results of the SearchForm component. Each employee is displayed on an EmployeeCard component. The EmployeeCard displays the employee's name and department. The EmployeeCard also has a link to the EmployeeDetail component if the user would like to see more information about the employee. 

function EmployeeList() {
    // console.debug('EmployeeList');

    const [employees, setEmployees] = useState(null);

    useEffect(function getEmployeesOnMount() {
        // console.debug('EmployeeList useEffect getEmployeesOnMount');
        search();
    }, []);

    async function search(firstname, lastname, email, extension) {
        // console.debug('EmployeeList search', 'firstname=', firstname);
        try {
            let employees = await KfgApi.getEmployees(firstname || lastname || email || extension || '');
            // console.debug('Employees fetched from API:', employees);
            setEmployees(employees);    
        }
        catch (err) {
            console.error('EmployeeList search: problem loading', err);
            setEmployees([]);
        }
    }

    if (!employees) return <LoadingSpinner />;

    return (
        <div className="EmployeeList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {employees.length > 0
                ? (employees.map(employee => (
                    <EmployeeCard
                        key={employee.employee_id}
                        employee_id={employee.employee_id}
                        firstname={employee.firstname}
                        lastname={employee.lastname}
                        email={employee.email}
                        department={employee.department}
                        extension={employee.extension}
                    />
                ))
                )
                : (<p className="lead">Hmm....No results found</p>
            )}
        </div>
    );
}

export default EmployeeList;