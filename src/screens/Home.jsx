import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { collection, getDocs, query } from "firebase/firestore";
import Post from "../components/Post";
import FriendRequests from "../components/FriendRequests";
import Friends from "../components/Friends";

function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState({});
  const [post, setPost] = useState([]);
  const [nexora, setNexora] = useState([]);
  const [loading, setLoading] = useState(true);
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

  async function gettingDocument() {
    const q = query(collection(db, "posts")); // Create a query to get all documents in "product" collection
    try {
      const querySnapshot = await getDocs(q); // Execute the query
      const allDocs = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return data;
      });
      setPost(allDocs); // Update product state with fetched data
      setLoading(false); // Set loading to false after data is fetched
      console.log(allDocs); // Log fetched data for debugging
    } catch (e) {
      console.log(e); // Log any error that occurs
      setLoading(false); // Set loading to false in case of error
    }
  }

  async function userDetails() {
    const q = query(collection(db, "nexoraUsers")); // Create a query to get all documents in "product" collection
    try {
      const querySnapshot = await getDocs(q); // Execute the query
      const allDocs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        // data.id = doc.id; // Add document ID to the data
        return data;
      });
      setNexora(allDocs); // Update product state with fetched data
      setLoading(false); // Set loading to false after data is fetched
      console.log(allDocs); // Log fetched data for debugging
    } catch (e) {
      console.log(e); // Log any error that occurs
      setLoading(false); // Set loading to false in case of error
    }
  }
  useEffect(() => {
    gettingDocument();
    userDetails();
  }, []);
  return (
    <>
      <Header
        name={users.displayName}
        imgSrc={users.photoURL}
        email={users.email}
        id={users.uid}
      />
      <div className="flex  items-start ">
        <div className="flex flex-col gap-3  mb-5 items-center border rounded-2xl border-opacity-30 border-gray-500 p-5 ml-2 ">
          <FriendRequests />
        </div>

        <div className="flex flex-col gap-3 justify-center mb-5 items-center  mx-auto">
          {post ? (
            post.map((item) => {
              console.log("items ====>", item);
              return (
                <Post
                  caption={item.caption}
                  img={item.img}
                  creator={item.creator}
                  creatoPic={item.creatorPic}
                  email={item.email}
                  id={item.creatorId}
                />
              );
            })
          ) : (
            <span className="loading loading-dots loading-lg"></span>
          )}
        </div>
        <div className="flex flex-col gap-3  mb-5 items-center border rounded-2xl border-opacity-30 border-gray-500 p-5 ml-2 ">
          <Friends/>
        </div>
      </div>
    </>
  );
}

export default Home;
