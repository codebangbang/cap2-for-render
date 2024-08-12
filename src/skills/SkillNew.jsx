import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import KfgApi from '../api/api';
import './SkillNew.css';

// This is my SkillNew component. It displays a form for an admin user to create a new skill. The admin may add a skill name and description for the new skill.

function SkillNew() {
    const [formData, setFormData] = useState({
        skill_name: "",
        description: "",
    });
    const history = useNavigate();

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
            await KfgApi.createSkill(formData);
            history('/skills');
        } catch (err) {
            console.error("Error creating skill", err);
        }
    };

    return (
        <div className="skill-new-container">
            <h2 className="text-center">New Skill</h2>
            <form onSubmit={handleSubmit} className="skill-form">
                <input className="form-control"  
                    id="skill_name"
                    name="skill_name"
                    type="text"
                    value={formData.skill_name}
                    onChange={handleChange}
                    placeholder="Skill Name"
                    required
                    
                />
                <input className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                    

                />
                <button type="submit" className="btn btn-primary">Add Skill</button>
            </form>
        </div>
    );
}

export default SkillNew;