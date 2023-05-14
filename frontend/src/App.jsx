import React, { useEffect, useContext } from "react";
import "./App.css";
import Signup from "./Components/User/Signup/Signup";
import Login from "./Components/User/Login/Login";
import Home from "./Components/User/Home/Home";
import Admin from "./Components/Admin/Admin";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Profile from "./Components/User/Profile/Profile";
import AdminLogin from "./Components/Admin/AdminLogin/AdminLogin";
function App() {
 
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/Profile"element={<Profile />} />
          <Route path="/admin/login" element={ <AdminLogin/>} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
