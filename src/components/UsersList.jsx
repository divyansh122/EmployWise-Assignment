// src/components/UsersList.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Users List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow">
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-center">
              {user.first_name} {user.last_name}
            </h3>
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => navigate(`/edit/${user.id}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UsersList;
