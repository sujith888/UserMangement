import React, { useReducer, useEffect ,useState} from "react";
import "./Login.css";
import Reducer from "./LoginReducer";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";
const initialValue = {
  password: "",
  email: "",
};
function Login({sessionError}) {
  console.log(sessionError);
  const navigate = useNavigate();
  const [loginstate, dispatch] = useReducer(Reducer, initialValue);
  const [isLoggedIn, setisLoggedIn] = useState(false)

  function setTokensInCookie(accessToken, refreshToken) {
    const cookieOptions = {
      path: "/",
      expires: 7, // in days
    };
    document.cookie = `access_token=${accessToken}; ${cookieOptions}`;
    document.cookie = `refresh_token=${refreshToken}; ${cookieOptions}`;
  }

  console.log(loginstate);
  useEffect(() => {
    axios
      .get("http://localhost:3000/login")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const loginSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/login", loginstate)
      .then((response) => {
        if (response.status) {
          setisLoggedIn(true)
          setTokensInCookie(
            response.data.accessToken,
            response.data.refreshToken
          );
          navigate("/");
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Header />
      <div className="login-container">
        <h2  style={{color:"red"}}>{sessionError &&  sessionError}</h2>
        <h1>Login</h1>
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
            value={loginstate.email}
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
            value={loginstate.password}
          />

          <button type="submit" onClick={loginSubmit}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
