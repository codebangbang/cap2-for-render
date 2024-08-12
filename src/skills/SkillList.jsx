import React, { useState, useEffect } from "react";
import Search from "../auth/SearchForm";
import KfgApi from "../api/api";
import SkillCard from "./SkillCard";
import LoadingSpinner from "../common/LoadingSpinner";

// This is my SkillList component. It displays a list of skills on SkillCards. The SkillCards display the skill name and description. The SkillList component also includes a search bar that allows the user to search for skills by name. The search bar is a controlled component that updates the list of skills displayed on the page as the user types in the search bar.

function SkillList() {
    // console.debug("SkillList");

    const [skills, setSkills] = useState(null);

    useEffect(function getSkillsOnMount() {
        // console.debug("SkillList useEffect getSkillsOnMount");
        search();
    }, []);

    async function search(skill_name) {
        // console.debug("SkillList search", "skill_name=", skill_name);
        try {
            let skills = await KfgApi.getSkills(skill_name || "");
            // console.debug("Skills fetched from API:", skills);
            setSkills(skills);
        }
        catch (err) {
            console.error("SkillList search: problem loading", err);
            setSkills([]);
        }
    }

    if (!skills) return <LoadingSpinner />;

    return (
        <div className="SkillList col-md-8 offset-md-2">
            <Search searchFor={search} />            
            {skills.length
                ? skills.map(skill => (
                    <SkillCard 
                        key ={skill.skill_id} 
                        skill_id={skill.skill_id}
                        skill_name={skill.skill_name}
                        description={skill.description}
                    />
                ))
                : <p className="lead">Hmm....No results found</p>
            }
        </div>
    );
}

export default SkillList;