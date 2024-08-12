import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import KfgApi from '../api/api';

// This is my SkillEdit component. It displays a form for an admin user to edit a skill. The admin may edit the skill name or description of the skill. The admin may also delete the skill.

function SkillEdit() {
    const { skill_id } = useParams();
    const [formData, setFormData] = useState({
        skill_name: '',
        description: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        async function getSkill() {
            const skill = await KfgApi.getSkill(skill_id);
            setFormData({
                skill_name: skill.skill_name || '',
                description: skill.description || '',
            });
        }
        getSkill();
    }, [skill_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cleanData = {};
        Object.keys(formData).forEach(key => {
            if (formData[key]) {
                cleanData[key] = formData[key];
            }
        });

        try {
            await KfgApi.updateSkill(skill_id, cleanData);
            navigate('/skills');
        } catch (err) {
            console.error("Error updating skill", err);
        }
    };   

    const handleDelete = async (e) => {
        if (window.confirm("Are you sure you want to delete this skill?")) {
            try {
                await KfgApi.deleteSkill(skill_id);
                navigate('/skills');
            } catch (err) {
                console.error("Error deleting skill", err);
            }
        }
    };

return (
     <div>
        <h2>Edit Skill</h2>
        <form className="edit-card-body" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="skill_name">Skill Name:</label>
                <input className="form-control"
                    type="text"
                    id="skill_name"
                    name="skill_name"
                    value={formData.skill_name}
                    onChange={handleChange}
                    placeholder='Skill Name'
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input className="form-control"
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder='Description'
                />
            </div>
            <button type="submit" id="edit-button" className="btn btn-primary">Update Skill</button>
            <button type="button" onClick={handleDelete} id="edit-button" className="btn btn-danger">Delete Skill</button>
        </form>
        
 </div>

)};

export default SkillEdit;