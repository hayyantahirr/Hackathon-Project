import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";

function Drawer({}) {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth); // Await signOut without then()
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
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <Link to={"/home"}>
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
    </>
  );
}

export default Drawer;
