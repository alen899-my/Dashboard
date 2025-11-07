import React, { useState } from "react";
import "../../styles/Users.css";
import AddUserComponent from "../AddUserComponent";

const UserOptions = ({
  onUserAdded,
  searchQuery,
  setSearchQuery,
  onSearch,
  onFilterByDepartment,
}) => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleDepartmentChange = (e) => {
    const value = e.target.value;
    setSelectedDepartment(value);
    if (onFilterByDepartment) onFilterByDepartment(value);
  };

  return (
    <div className="user_option_container">
      

      {showAddUser && (
        <AddUserComponent
          onClose={() => setShowAddUser(false)}
          onUserAdded={(newUser) => {
            if (onUserAdded) onUserAdded(newUser);
          }}
        />
      )}
    <div className="filtergroup">
    <div className="search_box">
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search_input"
        />
        
      </div>

       <div className="dropdown_box">
        <select
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="dropdown_select"
        >
          <option value="">All Departments</option>
<option value="Hr">HR</option>
<option value="Sales">Sales</option>
<option value="Marketing">Marketing</option>
<option value="Finance">Finance</option>
<option value="IT">IT</option>

        </select>
        <button className="btn-search" onClick={() => onSearch(searchQuery)}>
          Filter
        </button>
      </div>
      
    </div>
      
     <button className="btn-addds" onClick={() => setShowAddUser(true)}>
        Add User
      </button>
    </div>
  );
};

export default UserOptions;
