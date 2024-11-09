import React from "react";
import "../styles/post.css";
import AddFriend from "./AddFriend";
function Post({ img, caption, creator, email, creatoPic }) {
  function formatCaption(caption, wordsPerLine = 10) {
    const words = caption.split(" ");
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine).join(" "));
    }
    return lines;
  }

  return (
    <>
    
      <div className="instagram-card glass">
        {/* Instagram Card Header */}
        <div className="instagram-card-header flex items-center justify-start mt-5">
          <img
            src={creatoPic}
            className="instagram-card-user-image"
            alt="User"
          />
          <a className="instagram-card-user-name" href="">
            {creator}
          </a>
        </div>

        {/* Instagram Card Image */}
        <div className="instagram-card-image flex items-center justify-center">
          <img src={img} height="600px" alt="Post" />
        </div>

        {/* Instagram Card Content */}
        <div className="instagram-card-content">
          <p className="text-black">
            <a className="instagram-card-content-user">{creator}</a> {caption}
          </p>
          <p className="comments"> 48 comments</p>
        </div>

        {/* Instagram Card Footer */}
      </div>
    </>
  );
}

export default Post;
