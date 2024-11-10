import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

function FriendRequests() {
  const [senderId, setSenderId] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [currentUid, setCurrentUid] = useState("");
  const [recieverId, setRecieverId] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("currentUser====>", user.uid);
        setCurrentUid(user.uid);
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  async function gettingRequests() {
    const q = query(collection(db, "friendRequests"));
    try {
      const querySnapshot = await getDocs(q);
      const allDocs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        setSenderId(data.senderUserId);
        setRecieverId(data.recieverUserId);
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
        console.log(doc.id, " => ", data);
        setUserDetails(data);
        console.log("userDetails:", userDetails);
      });
    } else {
      console.log("No friend requests for the current user.");
    }
  };

  useEffect(() => {
    gettingRequests();
  }, []);

  useEffect(() => {
    showRequestToReciever();
  }, []); // Run showRequestToReciever when recieverId or currentUid changes

  return (
    <>
      <div className="text-white">
        <ul className="list-none">{userDetails.userName}</ul>
      </div>
    </>
  );
}

export default FriendRequests;
