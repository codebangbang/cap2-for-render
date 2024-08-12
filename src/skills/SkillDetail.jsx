import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import KfgApi from "../api/api";
import EmployeeCard from "../employees/EmployeeCard";
import LoadingSpinner from "../common/LoadingSpinner";

// This is my SkillDetail component. It displays the skill details and a list of employees with that skill. The EmployeeCard component is used to display the employee details. The EmployeeCard component displays the employee's name, department, office location, email, extension, and a link to message the employee on Teams. The email address is a mailto link that will open the user's default email client. The Teams link will open a chat with the employee in Teams. The card also displays the employee's skills and links to the skill page.

function SkillDetail() {
    const { skill_id } = useParams();
    const [skill, setSkill] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // console.debug("SkillDetail skill_id", skill_id);
    
    useEffect(() => {
        async function fetchSkillAndEmployees() {
            try {
                let skillData = await KfgApi.getSkill(skill_id);
                let employeesData = await KfgApi.getEmployeesBySkill(skill_id);
                setSkill(skillData);
                setEmployees(employeesData || []);
            } catch (err) {
                setError("Error loading skill details or employees.");
                console.error("SkillDetail getSkillAndEmployees: problem loading", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSkillAndEmployees();
    }, [skill_id]);


    if (isLoading) return <LoadingSpinner />;

    if (error) return <p className="error">{error}</p>

    if (!skill) return <p>Sorry, error getting the skill details. </p>;

    return (
        <div className="SkillDetail col-md-8 offset-md-2">
            <h1>{skill.skill_name}</h1>
            <h6 className="skillDescription">{skill.description}</h6>
            <hr></hr>

            <h4>Whew, found some help for you.</h4>
            {employees.length > 0 ? (
                employees.map(emp => (
                    <EmployeeCard
                        key={emp.employee_id}
                        id={emp.employee_id}
                        firstname={emp.firstname}
                        lastname={emp.lastname}
                        employee_id={emp.employee_id}
                        email={emp.email}
                        extension={emp.extension}
                        ms_teams_link={emp.ms_teams_link}
                        office_location={emp.office_location}
                        department={emp.department}
                        displayFields={["email", "extension", "department", "office_location", "ms_teams_link", "employee_id"]}
                    />
                ))
            ) : (
                <p>No employees found with this skill.</p>
            )}
        </div>
    );
    }

export default SkillDetail;
