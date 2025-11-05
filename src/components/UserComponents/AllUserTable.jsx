import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Users.css";
import viewIcon from "../../images/view.png";
import updateIcon from "../../images/update.png";
import deleteIcon from "../../images/dlt.png";
import UserCard from "./UserCard";
import UpdateUserCard from "./UpdateUserCard";
import AddUserComponent from "../AddUserComponent";
import UserOptions from "./UserOptions";

const AllUserTable = ({ userAddedSignal }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const limit = 3;

  const fetchUsers = async (currentPage = page) => {
    try {
      setLoading(true);
    
      const res = await axios.get(
        `http://localhost:5000/api/admin/users?page=${currentPage}&limit=${limit}`
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
    fetchUsers(page);
  }, [page]);

  useEffect(() => {
    if (userAddedSignal > 0) {
      fetchUsers();
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

  const handleCloseCard = () => setSelectedUser(null);

  const handleUpdate = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/users/${id}`);
      setSelectedUserForUpdate(res.data);
    } catch (error) {
      console.error("Error fetching user for update:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
        alert("User deleted successfully!");
        fetchUsers(page);
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{(page - 1) * limit + index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
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

          {/* ✅ Pagination controls */}
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
