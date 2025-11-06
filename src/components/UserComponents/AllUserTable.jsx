import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Users.css";
import viewIcon from "../../images/view.png";
import updateIcon from "../../images/update.png";
import deleteIcon from "../../images/dlt.png";
import UserCard from "./UserCard";
import UpdateUserCard from "./UpdateUserCard";
import UserOptions from "./UserOptions";

const AllUserTable = ({ userAddedSignal }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const limit = 3;

 

  // Fetch users from API
  const fetchUsers = async (currentPage, currentSearch,currentDept) => {
    try {
      setLoading(true);
      
      const search = currentSearch || ""; 
      const department=currentDept|| "";
      const res = await axios.get(
        `http://localhost:5000/api/admin/users?page=${currentPage}&limit=${limit}&search=${search}&department=${department}`
      );
      setUsers(res.data.users || []);
      
      setTotalPage(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers(page, searchQuery,selectedDepartment);
  }, [page,selectedDepartment]);

  useEffect(() => {
    if (userAddedSignal > 0) {
      fetchUsers(page, searchQuery,selectedDepartment);
    }
  }, [userAddedSignal]);

  
  const handleView = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/users/${id}`);
      setSelectedUser(res.data);
    } catch (error) {
      console.log("Error viewing user:", error);
    }
  };
  const handleFilterByDepartment = (dept) => {
    setSelectedDepartment(dept);
    setPage(1);
    fetchUsers(1, searchQuery, dept);
  };

  const handleSearch = () => {
    setPage(1);
    fetchUsers(1, searchQuery, selectedDepartment);
  };
  const handleCloseCard = () => setSelectedUser(null);

  // Update user
  const handleUpdate = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/users/${id}`);
      setSelectedUserForUpdate(res.data);
    } catch (error) {
      console.error("Error fetching user for update:", error);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
        alert("User deleted successfully!");
        fetchUsers(page, searchQuery, selectedDepartment);
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  // Pagination controls
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="users_container">
      <h2>All Registered Users</h2>

      {/* Search + Add User */}
      <UserOptions
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onUserAdded={() => fetchUsers(page, searchQuery,selectedDepartment)}
        onSearch={handleSearch}
        onFilterByDepartment={handleFilterByDepartment}
      />

      {loading ? (
        <p className="loading_text">Loading users...</p>
      ) : (
        <>
          <div className="table_wrapper">
            <table className="users_table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* FIX: Map over 'users' state, not 'filteredUsers' */}
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{(page - 1) * limit + index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.Department}</td>
                      <td className="action_btns">
                        <button
                          className="action_btn view_btn"
                          onClick={() => handleView(user._id)}
                        >
                          <img src={viewIcon} alt="View" />
                          <span>View</span>
                        </button>

                        <button
                          className="action_btn update_btn"
                          onClick={() => handleUpdate(user._id)}
                        >
                          <img src={updateIcon} alt="Update" />
                          <span>Update</span>
                        </button>

                        <button
                          className="action_btn delete_btn"
                          onClick={() => handleDelete(user._id)}
                        >
                          <img src={deleteIcon} alt="Delete" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination_controls">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="pagination_btn"
            >
              ⬅️ Previous
            </button>
            <span className="page_info">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="pagination_btn"
            >
              Next ➡️
            </button>
          </div>
        </>
      )}

      {/* Popups */}
      {selectedUser && <UserCard user={selectedUser} onClose={handleCloseCard} />}

      {selectedUserForUpdate && (
        <UpdateUserCard
          user={selectedUserForUpdate}
          onClose={() => setSelectedUserForUpdate(null)}
          onUserUpdated={(updated) => {
            setUsers((prev) =>
              prev.map((u) => (u._id === updated._id ? updated : u))
            );
          }}
        />
      )}
    </div>
  );
}; 

export default AllUserTable;