import React, { useReducer, useContext, useEffect,useState } from "react";
import "./AdminLogin.css";
import Reducer from "./Reduce";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const initialValue = {
  password: "",
  email: "",
};

function setTokensInCookie(accessToken, refreshToken) {
  const cookieOptions = {
    path: "/",
    expires: 7, // in days
  };
  document.cookie = `adminAccessToken=${accessToken}; ${cookieOptions}`;
  document.cookie = `adminRefreshToken=${refreshToken}; ${cookieOptions}`;
}


function Login() {
  const [adminName, setadminName] = useState('')
  useEffect(() => {
    axios.get("http://localhost:3000/admin/login").then((response) => {
      console.log(response);
    });
  }, []);

  const navigate = useNavigate();
  const [state, dispatch] = useReducer(Reducer, initialValue);

  const adminloginSubmit = () => {
    axios.post("http://localhost:3000/admin/login", state).then((response) => {
      console.log(response);
    setadminName(response.data.adminName)
      setTokensInCookie(  response.data.adminAccessToken,
        response.data.adminRefreshToken);
      
    
      if (response.data.status) {
        navigate("/admin");
      } else {
        navigate("/admin/login");
      }
    });
  };

  return (
    <>
      <div className="login-container">
        <h1> Admin Login</h1>
        <form>
          <label htmlFor="username">Username</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => {
              dispatch({ type: "EMAIL", value: e.target.value });
            }}
            value={state.email}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => {
              dispatch({ type: "PASSWORD", value: e.target.value });
            }}
            value={state.password}
          />

          <button type="button" onClick={adminloginSubmit}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}
export default Login;
