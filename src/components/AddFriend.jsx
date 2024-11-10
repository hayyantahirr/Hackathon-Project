import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

function AddFriend({ receiverID }) {
  const [users, setUsers] = useState({});
  const [senderId, setSenderId] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("currentUser====>", user.uid);
        setUsers(user);
        setSenderId(user.uid);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth]);
  async function friendRequest() {
    console.log("recieverId =====>" + receiverID);
    console.log("senderId =====>" + senderId);
    try {
      await addDoc(collection(db, "friendRequests"), {
        senderUserId: senderId,
        recieverUserId: receiverID,
        status: "pending",
       
      });
      console.log("Friend request sent successfully");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <>
      <button className="btn" onClick={friendRequest}>
        Add Friend
      </button>
    </>
  );
}

export default AddFriend;
