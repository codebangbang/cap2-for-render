import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// API class to make requests to the backend

class KfgApi {
    static token;

    static setToken(newToken) {
        this.token = newToken;
    }

    static async request(endpoint, data = {}, method = "get") {
        // console.debug("API Call:", "endpoint", endpoint, "data", data, "method", method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${KfgApi.token}` };

        const config = {
            method, url, headers
        };

        if (method === "get") {
            config.params = data;
        } else {
            config.data = data;
        }

        try {
            const response = await axios(config);
            // console.debug("API Response:", response.data);
            return response.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }
    
    static async getCurrentUser(username) { 
        let res = await this.request(`users/${username}`);
        // console.log(`Current User in KfgApi:`, res);
        return res.user;
    }

    static async getEmployees(searchTerm = '') {
        let endpoint = 'employees';
        let params = {};
            
        if (searchTerm) {
                params.search = searchTerm;
            }

        // console.debug("API Call: endpoint=", endpoint, "params=", params);

        let res = await this.request(endpoint, params);
        return res.employees;
    }

    static async getEmployee(employee_id) {
        // console.debug("API getEmployee", "employee_id=", employee_id);
        let res = await this.request(`employees/${employee_id}`);
        return res.employee;
    }

    static async getEmployeeSkills(employee_id) {
        try {
            let res = await this.request(`employees/${employee_id}/skills`);
            // console.debug("getEmployeeSkills Response", res);
            return res.skills || [];
        } catch (err) {
            console.error("API Error in getEmployeeSkills", err);
            throw err;
        }
    }

    static async createEmployee(data) {
        let res = await this.request("employees", data, "post");
        return res.employee;
    }

    static async updateEmployee(employee_id, data) {
        let res = await this.request(`employees/${employee_id}`, data, "patch");
        return res.employee;
    }

    static async deleteEmployee(employee_id) {
        let res = await this.request(`employees/${employee_id}`, {}, "delete");
        return res.message;
    }
    
    static async getSkills(skill_name) {
        // console.debug("getSkills", "skill_name=", skill_name);
        let res = await this.request("skills", {skill_name});
        return res.skills;
    }
    
    static async getSkill(skill_id) {
        // console.debug("getSkill", "skill_id=", skill_id);
        let res = await this.request(`skills/${skill_id}`);
        return res.skill;
    }

    static async getEmployeesBySkill(skill_id) {
        // console.debug("getEmployeesBySkill", "skill_id=", skill_id);
        let res = await this.request(`skills/${skill_id}/employees`);
        return res.employees;
    }

    static async deleteSkill(skill_id) {
        let res = await this.request(`skills/${skill_id}`, {}, "delete");
        return res.message;
    }

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    static async createSkill(data) {
        let res = await this.request("skills", data, "post");
        return res.skill;
    }

    static async updateSkill(skill_id, data) {
        let res = await this.request(`skills/${skill_id}`, data, "patch");
        return res.skill;
    }

    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }

    static async getDepartments() {
        try {
            let res = await this.request("departments");
            return res.departments;
        } catch (err) {
            console.error("API Error in getDepartments", err);
            throw err;
        }
    }

    static async getOfficeLocations() {
        try {
            let res = await this.request("officeLocations");
            return res.officeLocations;
        } catch (err) {
            console.error("API Error in getOfficeLocations", err);
            throw err;
        }
    }
}

export default KfgApi;