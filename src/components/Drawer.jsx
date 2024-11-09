import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../config/firebase";

function Drawer() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("Sign-out successful.");
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // Initialize theme from localStorage or default to "emerald"
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "emerald"
  );

  // Update theme in localStorage and set the HTML attribute on change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  // Toggle theme between "emerald" and "synthwave"
  const handleToggle = () => {
    setTheme((prevTheme) =>
      prevTheme === "emerald" ? "synthwave" : "emerald"
    );
  };

  return (
    <div className="flex">
      {/* Sidebar, always visible on large screens */}
      <div className="drawer-side w-80 bg-base-200 text-base-content p-4 lg:block hidden min-h-screen">
        <ul className="menu">
          <Link to="/home">
            <li>
              <a>Homepage</a>
            </li>
          </Link>
          <li>
            <a>Chats</a>
          </li>
          <li>
            <button onClick={handleToggle}>
              Switch theme {theme === "emerald" ? "darkMode" : "Light Mode"}
            </button>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>

      {/* Drawer content area */}
      <div className="flex-1">
        {/* "Open drawer" button for smaller screens */}
        <label
          htmlFor="my-drawer"
          className="btn btn-primary lg:hidden block m-4"
        >
          Open drawer
        </label>

        {/* Page content goes here */}
        <div className="p-4">
          {/* Content of your main page */}
          <h1>Your Page Content</h1>
        </div>
      </div>

      {/* Drawer overlay and toggle for smaller screens */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side lg:hidden">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content w-80 p-4">
          <Link to="/home">
            <li>
              <a>Homepage</a>
            </li>
          </Link>
          <li>
            <a>Chats</a>
          </li>
          <li>
            <button onClick={handleToggle}>
              Switch theme {theme === "emerald" ? "darkMode" : "Light Mode"}
            </button>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Drawer;
