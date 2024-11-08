import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Home() {
  const [name, setName] = useState(null);
  const navigate = useNavigate();
  const [users, setUsers] = useState({});
  // setName(localStorage.getItem("name"))
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUsers(user);
      } else {
        console.log("please login first!");
        // Use Link for navigation is not appropriate here, as we need to redirect programmatically
        window.location.href = "/"; // Redirect to login page if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth]);
  const logout = async () => {
    await signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <>
      <button onClick={logout}>logout</button>
      <div>Hello {users.displayName}</div>
    </>
  );
}

export default Home;
