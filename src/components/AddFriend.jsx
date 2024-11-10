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
      <button
        className="bg-green-600 h-[30px] w-[30px] rounded-3xl mx-2"
        onClick={friendRequest}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-4 h-4 mx-auto">
          <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
        </svg>
      </button>
    </>

  );
}

export default AddFriend;
