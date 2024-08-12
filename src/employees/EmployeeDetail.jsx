import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KfgApi from "../api/api";
import EmployeeCard from "./EmployeeCard";
import LoadingSpinner from "../common/LoadingSpinner";

// This is my EmployeeDetail component. It displays the employee details on the EmployeeCard component.  Details included on the card are the employees name, department, office location, email, extension, and a link to message the employee on Teams. The email address is a mailto link that will open the user's default email client. The Teams link will open a chat with the employee in Teams. The card also displays the employee's skills and links to the skill page.

function EmployeeDetail(){
    const { employee_id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [skills, setSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // console.debug("EmployeeDetail", "employee=", employee);
    
    useEffect(() => {
        async function fetchEmployeeAndSkills() {
            try {
                let fetchedEmployee = await KfgApi.getEmployee(employee_id);
                // console.debug("fetchedEmployee", fetchedEmployee);
                let fetchedSkills = await KfgApi.getEmployeeSkills(employee_id);
                // console.debug("fetchedSkills", fetchedSkills);
                setEmployee(fetchedEmployee);
                setSkills(Array.isArray(fetchedSkills) ? fetchedSkills : []);
               
            } catch (err) {
                console.error("EmployeeDetail: fetchEmployeeAndSkills", err);
            } finally {
                setIsLoading(false); 
            }
        }
        fetchEmployeeAndSkills();
    }, [employee_id]);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="lead">Sorry, an error occurred: {error}</div>;
    if (!employee) return <div className="lead">Sorry, no such employee exists.</div>;
    
    return (
        <div className="EmployeeDetail col-md-8 offset-md-2">
            <h2>Employee Detail</h2>
            <EmployeeCard
                key={employee.employee_id}
                employee_id={employee.employee_id}
                firstname={employee.firstname}
                lastname={employee.lastname}
                email={employee.email}            
                extension={employee.extension}
                department={employee.department}
                ms_teams_link={employee.ms_teams_link}
                office_location={employee.office_location}
                displayFields={["email", "extension", "department", "office_location", "ms_teams_link"]}
                skills={skills}
            />
            {skills.length === 0 && (
                <p className="lead">No skills listed for this employee.</p>
            )}
        </div>
    );
}

export default EmployeeDetail;