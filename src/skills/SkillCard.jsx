import React from 'react';
import { Link } from 'react-router-dom';

// This is my SkillCard component. It displays a card template for a skill.

function SkillCard({ skill_id, skill_name, description }) {
    // console.debug("SkillCard", skill_id, skill_name, description);

    return (
        <Link className="SkillCard" to={`/skills/${skill_id}`}>
            <div className="card-body">
                <h4 className="card-title">{skill_name}</h4>
                <h6 className="card-description-text">{description}</h6>
            </div>
        </Link>
    )
}

export default SkillCard;