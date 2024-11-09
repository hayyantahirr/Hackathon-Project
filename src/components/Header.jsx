import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { auth } from "../config/firebase"; // Make sure auth is imported
import AddPost from "../screens/Addpost";
import Drawer from "./Drawer";

function Header({ name, imgSrc, email , id}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUid, setCurrentUid] = useState("");
  // Logout function
 

 

 
  return (
    <>
      <div className="navbar bg-base-100 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              
              <Drawer  />
            </div>
           
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]">
            Nexora
          </a>
        </div>
        <div className="navbar-end">
          {location.pathname !== "/addpost" && (
            <button
              className="bg-white text-center w-40 rounded-2xl h-10 relative text-black text-xl font-semibold group mr-8"
              type="button"
              onClick={() => {
                navigate("/addpost", { state: id });
              }}
            >
              <div className="bg-green-400 rounded-xl h-8 w-1/5 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[152px] z-10 duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="20px"
                  height="20px"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                </svg>
              </div>
              <p className="translate-x-2 text-slate-950 text-sm">Add Post</p>
            </button>
          )}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div
                className="w-10 rounded-full"
                style={{ display: window.innerWidth < 782 ? "none" : "block" }}
              >
                <img alt="User avatar" src={imgSrc} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <p>Name : {name} </p>
              </li>
              <li>
                <p>
                  Email :
                  <span className="font-semibold text-[0.53rem]">{email}</span>
                </p>
              </li>
              <li>
                <a>Friend Requests</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
