import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

// This is my SignupForm component. It displays a form for a user to sign up.

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    let res = await signup(formData);
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
    <div className="SignupForm">
      <h2>Let's get you signed up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            autoComplete="username"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            autoComplete="current-password"
            required
          />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {formErrors.length ? (
          <div className="alert alert-danger">
            {formErrors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}

        <button type="submit" className="btn btn-primary">
          Submit <i className="fas fa-arrow-circle-right"></i>
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
