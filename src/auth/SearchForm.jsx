import React, { useState } from "react";
import "./SearchForm.css";

// This is my SearchForm component. It displays a form for a user to search for an employee or a certain skill that they need help with. .

function SearchForm({ searchFor }) {
  // console.debug("SearchForm", "searchFor=", typeof searchFor);
    const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // console.debug("Submitting search with term:", searchTerm);
    searchFor(searchTerm.trim());
  }

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="SearchForm mb-4">
    <form className="SearchForm form-inline mb-4" onSubmit={handleSubmit}>
     <input
      name="searchTerm"
      value={searchTerm}
      onChange={handleChange}
      placeholder="I need..."
      className="form-control form-control-lg flex-grow-1"
    />
      <button type="submit" id="searchbtn" className="btn btn-med btn-primary">Submit</button>
    </form>
    </div>
  );
}

export default SearchForm;