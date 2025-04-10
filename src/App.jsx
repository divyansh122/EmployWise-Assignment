// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import UsersList from "./components/UsersList";
import EditUser from "./components/EditUser";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={isAuthenticated ? <UsersList /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:id"
          element={isAuthenticated ? <EditUser /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
