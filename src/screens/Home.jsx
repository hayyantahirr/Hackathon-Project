import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Header from "../components/Header";

function Home() {
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

  return (
    <>
      <Header
        name={users.displayName}
        imgSrc={users.photoURL}
        email={users.email}
      />

      <div>Hello {users.displayName}</div>
    </>
  );
}

export default Home;
