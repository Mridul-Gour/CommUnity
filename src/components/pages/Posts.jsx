

import { useState, useEffect } from "react";
import "./ui/Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleAddPost = async () => {
    if (!description || !image) return;

    const formData = new FormData();
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        fetchPosts();
        setShowModal(false);
        setDescription("");
        setImage(null);
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div className="posts-container">
      <button className="add-post-btn" onClick={() => setShowModal(true)}>+ Add Post</button>

      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <img src={post.imageUrl} alt="Post_img" className="post-image" />
            <p className="post-description">{post.description}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Post</h3>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div className="modal-buttons">
              <button onClick={handleAddPost}>Submit</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;

