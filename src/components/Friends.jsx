import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

function Friends() {
  const [sendersId, setSendersId] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [currentUid, setCurrentUid] = useState("");
  const [recieverId, setRecieverId] = useState("");
  const showFriends = async () => {
    const q = query(
      collection(db, "friendRequests"),
      where("status", "==", "accepted")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      console.log(" => ", data);
      setSendersId(data.senderUserId);
      setRecieverId(data.recieverUserId);
      console.log("userDetails:", userDetails);
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("currentUser====>", user.uid);
        setCurrentUid(user.uid);
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);
  const showRequestToReciever = async () => {
    // First check if the current user is the receiver of the request
    if (recieverId === currentUid) {
      const q = query(

        collection(db, "nexoraUsers"),
        where("userId", "==", sendersId)
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
  useEffect(() => {
    showFriends();
    showRequestToReciever();
  }, []);

  return (
    <>
      {" "}
      <div className="text-white">
        <h1 className="text-xl flex mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-6 h-6 mr-3"
          >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
          </svg>
          Friends
        </h1>

        <ul className="list-none">
          <li className="flex items-center ">
            <img
              className="rounded-full w-10 h-10 mr-5"
              src={userDetails.img}
              alt=""
            />
            {userDetails.userName}
          </li>
        </ul>
      </div>
    </>
  );
}

export default Friends;
