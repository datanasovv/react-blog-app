import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        loggedInUser: action.payload,
      };
    case "LOGIN_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function LoginPage() {
  const { user, setUser } = useContext(ThemeContext);
  const navigate = useNavigate();
  if(user){
      navigate('/profile')
  }
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    loggedInUser: null,
  });
  const { loading, error, loggedInUser } = state;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const { data } = await axios(
        `https://jsonplaceholder.typicode.com/users?email=${email}&password=${password}`
      );
      if (data.length > 0) {
        dispatch({ type: "LOGIN_SUCCESS", payload: data[0] });
      } else {
        dispatch({ type: "LOGIN_FAIL", payload: "Invalid email or password" });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAIL", payload: err.message });
    }
  };
  useEffect(() => {
    if (loggedInUser) {
        setUser(user)
      return navigate("/profile");
    }
  }, [loggedInUser]);
  return (
    <div>
      <h1>Login User</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-item">
          <label htmlFor="email">Email: </label>
          <input
            name="email"
            id="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-item">
          <label htmlFor="password">Password: </label>
          <input
            name="password"
            id="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="form-item">
          <label></label>
          <button>Login</button>
        </div>
        {loading && (
          <div className="form-item">
            <label></label>
            <span>Processing...</span>
          </div>
        )}
        {error && (
          <div className="form-item">
            <label></label>
            <span className="error">{error}</span>
          </div>
        )}
        <div className="form-item">
          <label></label>
          <span>
            New user ? <Link to="/register">Register</Link>
          </span>
        </div>
        <div className="form-item">
          <label></label>
          <span>Or use email: Sincere@april.biz password: 123 </span>
        </div>
      </form>
    </div>
  );
}
