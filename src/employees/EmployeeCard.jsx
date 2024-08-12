import React  from 'react';
import { Link } from 'react-router-dom';

// This is my EmployeeCard component. It displays a card for an employee.  

function EmployeeCard({ employee_id, firstname, lastname, email, extension, department, ms_teams_link, office_location, displayFields=[], skills=[] }) {
    // console.debug("EmployeeCard-8.1", employee_id, firstname, lastname, email, extension, department, ms_teams_link, office_location);

    return (
        <div className="EmployeeCard">
        <div className="card-body">
            <h4>
                <Link className="card-title" to={`/employees/${employee_id}`}> {firstname} {lastname} </Link>
            </h4>
                <h6>{department}</h6>
                <ul className="list-unstyled">
                    {displayFields.includes("office_location") && <li>Office Location: {office_location}</li>}
                    {displayFields.includes("email") && (
                        <li> Email {firstname}: <a href={`mailto:${email}`}>{email}</a> </li>)}
                    
                    {displayFields.includes("extension") && <li>Extension: {extension}</li>}
                    {displayFields.includes("ms_teams_link") && ms_teams_link && (
                        <li> Message on Teams:{" "} 
                            <a href={`msteams:chat/0/0?users=${ms_teams_link}`}> {firstname}
                        </a>
                        </li>
                        )}
                </ul>
                {skills && skills.length > 0 && (
                    <div>
                        <h4>Skills</h4>
                        <ul className="list-unstyled">
                            {skills.map((skill) => (
                            <li key={skill.skill_id}>
                                <Link to={`/skills/${skill.skill_id}`}>{skill.skill_name}</Link>
                            </li>
                    ))}
                </ul>
            </div>
            )}
            </div>
        </div>
    ); 
}

export default EmployeeCard;
