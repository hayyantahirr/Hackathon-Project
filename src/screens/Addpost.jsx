import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

function AddPost({ currentUid }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState({});
  const [selectedImage, setSelectedImage] = useState(null); // Track selected image URL
const [userDetails, setUserDetails] = useState([]);
  const caption = useRef();
  const img = useRef();
  const { state } = location; // Get `uid` from passed state

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file

    if (file) {
      // Check if the file is an image
      if (file.type.startsWith("image/")) {
        setSelectedImage(URL.createObjectURL(file)); // Store the image URL
      } else {
        alert("Please upload an image file");
        img.current.value = ""; // Reset file input if file is not an image
      }
    }
  };
  const gettingUserThroughUid = async (uid) => {
    const q = query(collection(db, "nexoraUsers"), where("userId", "==", state));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserDetails(doc.data());
    });
  };
  // Submit the post with validation
  const submitPost = async (e) => {
    e.preventDefault();
    console.log("current user idddd", userDetails);

    const captionText = caption.current.value;
    const wordCount = captionText
      .split(/\s+/)
      .filter((word) => word.length > 0).length; // Count words

    // if (wordCount < 20 || wordCount > 120) {
    //   alert("Caption must be between 40 and 120 words");
    //   return; // Stop submission if validation fails
    // }

    if (img.current.files && img.current.files[0]) {
      const file = img.current.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, "product/" + file.name);

      // Upload image to Firebase storage
      await uploadBytes(storageRef, file);

      // Get the download URL of the uploaded image
      const url = await getDownloadURL(storageRef);
      console.log("Image URL: ", url);
      try {
        await addDoc(collection(db, "posts"), {
          caption: captionText,
          img: url,
          creator : userDetails.userName,
          email : userDetails.email,
          creatorPic : userDetails.img,
          creatorId: userDetails.userId
        });
        console.log("Product added successfully");
        navigate(-1); // Navigate back after successful submission
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      // You can proceed with other form data submission (e.g., caption, etc.)
    } else {
      console.log("No file selected");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsers(user);
      } else {
        console.log("Please login first!");
        window.location.href = "/"; // Redirect to login page if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    gettingUserThroughUid();
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
          <form className="mt-20" onSubmit={submitPost}>
            <div className="max-w-lg mx-auto rounded-lg overflow-hidden md:max-w-xl">
              <div className="md:flex">
                <div className="w-full p-3">
                  <div className="relative h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    {selectedImage ? (
                      // Display the selected image if an image is chosen
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="object-cover w-full h-full rounded-lg"
                      />
                    ) : (
                      <div className="absolute flex flex-col items-center gap-2">
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
                    )}

                    <input
                      name="fileUpload"
                      className="h-full w-full opacity-0 cursor-pointer"
                      type="file"
                      ref={img}
                      onChange={handleFileChange}
                      accept="image/*" // Restrict to image files
                    />
                  </div>
                </div>
              </div>
            </div>
            <textarea
              name="caption"
              className="text-field resize-y min-h-32 max-h-40 mb-5"
              placeholder="Write a caption"
              ref={caption}
            ></textarea>
            <button
              type="submit"
              className="inline-block rounded-md bg-[#3d405b] border-none text-white text-center text-lg px-4 py-4 w-[130px] transition-all duration-500 cursor-pointer m-1 group"
            >
              <span className="relative inline-block transition-all duration-500 group-hover:pr-4">
                Button
                <span className="absolute opacity-0 top-0 right-[-15px] transition-all duration-500 group-hover:opacity-100 group-hover:right-0">
                  »
                </span>
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPost;
