// src/components/EditUser.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditUser() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      setUser(response.data.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      setMessage("User updated successfully");
      setTimeout(() => navigate("/users"), 1000);
    } catch (err) {
      setMessage("Error updating user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={user.first_name}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              placeholder="First Name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              value={user.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              placeholder="Last Name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {message && (
            <p
              className={
                message.includes("success") ? "text-green-500" : "text-red-500"
              }
            >
              {message}
            </p>
          )}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
