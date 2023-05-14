import React, { useReducer, useEffect, useContext } from "react";
import "./Signup.css"; // Import external CSS file
import Reducer from "./Reduce";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";
const initialValue = {
  name: "",
  password: "",
  phoneNumber: "",
  email: "",
};
function SignupForm() {
  const navigate=useNavigate()
  const [state, dispatch] = useReducer(Reducer, initialValue);

  useEffect(() => {
    axios
      .get("http://localhost:3000/signup")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const signupSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/signup", state)
      .then((response) => {
        console.log(response);
        navigate('/login')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Header />
      <div className="signup-form-container">
        <h2>Create an Account</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={state.name}
              required
              onChange={(e) => {
                dispatch({
                  type: "USERNAME",
                  value: e.target.value,
                });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              value={state.phoneNumber}
              name="phone"
              required
              onChange={(e) => {
                dispatch({
                  type: "PHONENUMBER",
                  value: e.target.value,
                });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={state.email}
              required
              onChange={(e) => {
                dispatch({
                  type: "EMAIL",
                  value: e.target.value,
                });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={state.password}
              required
              onChange={(e) => {
                dispatch({
                  type: "PASSWORD",
                  value: e.target.value,
                });
              }}
            />
          </div>
          <button type="button" onClick={signupSubmit}>
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupForm;
