import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

function FriendRequests() {
  const [senderId, setSenderId] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [currentUid, setCurrentUid] = useState("");
  const [recieverId, setRecieverId] = useState("");
  const [documnetId, setDocumnetId] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("currentUser====>", user.uid);
        setCurrentUid(user.uid);
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  async function requestDecline() {
    await deleteDoc(doc(db, "friendRequests", documnetId)); // Delete the document", "DC"));

    // Remove the 'capital' field from the document
  }
  async function gettingRequests() {
    const q = query(collection(db, "friendRequests"));
    try {
      const querySnapshot = await getDocs(q);
      const allDocs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        setDocumnetId(doc.id);

        setSenderId(data.senderUserId);
        setRecieverId(data.recieverUserId);
        setStatus(data.status);
        console.log(" => ", status);
        
        return data;
      });
      console.log(allDocs); // Log fetched data for debugging
    } catch (e) {
      console.log(e);
    }
    
  }

  const showRequestToReciever = async () => {
    // First check if the current user is the receiver of the request
    if (recieverId === currentUid) {
      const q = query(
        collection(db, "nexoraUsers"),
        where("userId", "==", senderId)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        console.log(" => ", data);
        setUserDetails(data);
        console.log("userDetails:", userDetails);
      });
    } else {
      console.log("No friend requests for the current user.");
    }
  };
  async function requestAccept() {
    console.log("accept");
    const requestAccepted = doc(db, "friendRequests", documnetId);

    // Set the "capital" field of the city 'DC'
    await updateDoc(requestAccepted, {
      status: "accepted",
    });
  }
  useEffect(() => {
    gettingRequests();
  }, []);

  useEffect(() => {
    showRequestToReciever();
  }, []); // Run showRequestToReciever when recieverId or currentUid changes

  return (
    <>
      <div className="text-white">
        <h1 className="text-xl flex mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-6 h-6 mr-3"
          >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
          </svg>
          Friend Requests
        </h1>
        {status === "pending" ? (
          <ul className="list-none">
            <li className="flex items-center ">
              <img
                className="rounded-full w-10 h-10 mr-5"
                src={userDetails.img}
                alt=""
              />
              {userDetails.userName}
              <button
                className=" bg-green-600 h-[30px] w-[30px] rounded-3xl mx-2"
                onClick={requestAccept}
              >
                {" "}
                ✔
              </button>
              <button
                className=" bg-red-700  h-[30px] w-[30px] rounded-3xl"
                onClick={requestDecline}
              >
                X
              </button>
            </li>
          </ul>
        ) : (
          <h1>No Friend Requests</h1>
        )}
      </div>
    </>
  );
}

export default FriendRequests;
