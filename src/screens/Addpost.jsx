import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

function Addpost() {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUsers(user);
      } else {
        console.log("Please login first!");
        window.location.href = "/"; // Redirect to login page if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <>
      <Header
        name={users.displayName}
        imgSrc={users.photoURL}
        email={users.email}
      />
      <div className="container mx-auto relative">
        <div className="flex items-center justify-center">
          {/* Apply responsive class to hide the image at 782px width and below */}
          <span className="hidden md:inline">
            <img
              src="/public/Nexora_logo-removebg-preview.png"
              alt="Nexora Logo"
              width={250}
              height={250}
            />
          </span>
          <div>
            <div className="max-w-lg mx-auto rounded-lg overflow-hidden md:max-w-xl">
              <div className="md:flex">
                <div className="w-full p-3">
                  <div className="relative h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <div className="absolute flex flex-col items-center">
                      <img
                        alt="File Icon"
                        className="mb-3"
                        src="https://img.icons8.com/dusk/64/000000/file.png"
                      />
                      <span className="block text-gray-500 font-semibold">
                        Drag &amp; drop your files here
                      </span>
                      <span className="block text-gray-400 font-normal mt-1">
                        or click to upload
                      </span>
                    </div>

                    <input
                      name=""
                      className="h-full w-full opacity-0 cursor-pointer"
                      type="file"
                    />
                  </div>
                </div>
              </div>
            </div>
            <textarea
              name=""
              id=""
              className="text-field resize-y min-h-32 max-h-40 mb-20"
              placeholder="Write a caption"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addpost;
