import React, { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="header">
      <div className="header-item">
        <Link to="/">
          <strong>Awesome Blog</strong>
        </Link>
      </div>
      <div className="header-item">
        <form onSubmit={handleSubmit}>
          <input
            name="query"
            type="text"
            placeholder="search posts"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button>Go</button>
        </form>
      </div>
      <div className="header-item">
        <a href="/login">Login</a>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Theme:light" : "Theme:dark"}
        </button>
      </div>
    </div>
  );
}
