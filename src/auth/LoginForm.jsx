import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";

// This is my Login Form component. It displays a form for a user to log in.

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    let res = await login(formData);
    // console.log(`logged in result: ${res}`);
    if (res.success) {
      navigate("/");
    } else {
      setFormErrors(res.errors);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  return (
    <div className="LoginForm">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null }

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;
