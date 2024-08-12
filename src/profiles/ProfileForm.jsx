import React, { useState, useContext } from "react";
import KfgApi from "../api/api";
import UserContext from "../auth/UserContext";
import Alert from "../common/Alert";
import "../index.css";
 
function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstname: currentUser.firstname,
    lastname: currentUser.lastname,
    email: currentUser.email,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  const [saveConfirmed, setSaveConfirmed] = useState(false);

  // console.debug(
  //   "ProfileForm",
  //   "currentUser=", currentUser,
  //   "formData=", formData,
  //   "formErrors=", formErrors,
  //   "saveConfirmed=", saveConfirmed,
  // );

  async function handleSubmit(e) {
    e.preventDefault();

    let profileData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await KfgApi.saveProfile(username, profileData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
  }

  setFormData(f => ({ ...f, password: "" }));
  setFormErrors([]);
  setSaveConfirmed(true);

  setCurrentUser(updatedUser);
}

function handleChange(e) {
  const { name, value } = e.target;
  setFormData(f => ({
    ...f,
    [name]: value,
  }));
  setFormErrors([]);
}

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h2>Profile</h2>
      <div className="card-body">
        <div className="profile-card-body">
          <form>
            <div className="form-group">
              <label>Username</label>
              <p className="form-control-plaintext">{formData.username}</p>
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                name="firstname"
                className="form-control"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                name="lastname"
                className="form-control"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm password to make changes:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {formErrors.length
              ? <Alert type="danger" messages={formErrors} />
              : null}

            {saveConfirmed
              ?
              <Alert type="success" messages={["Updated successfully."]} />
              : null} 

            <button
              className="btn btn-primary btn-block mt-4" id="savebtn"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;