
import React, { useState } from "react";
import "../../styles/Users.css"
import AddUserComponent from "../AddUserComponent";

const UserOptions = ({ onUserAdded }) => {
  const [showAddUser, setShowAddUser] = useState(false);

  return (
    <div className="user_option_container">
      <button className="btn-addds" onClick={() => setShowAddUser(true)}>Add User</button>
      {showAddUser && (
        <AddUserComponent
          onClose={() => setShowAddUser(false)}
          onUserAdded={(newUser) => {
            if (onUserAdded) onUserAdded(newUser);
          }}
        />
      )}
    </div>
  );
};

export default UserOptions;

