import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import Form from "../../components/Form";

const Base_url = process.env.REACT_APP_BACKEND_URL;

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const navigate = useNavigate();

  const { userData } = useAuth();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!userData || !userData._id) {
      toast.error("You need to be logged in to create a post.");
      return;
    }

    const obj = { title, content, tags, authorId: String(userData._id) };

    try {
      const res = await axios.post(`${Base_url}/create/post`, obj);

      if (res.status === 201) {
        toast.success("Post created successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error creating post:", error.response || error.message);
      toast.error("Failed to create post.");
    }
  };

  // Add a tag
  const handleAddTag = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  // Delete a tag
  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Form
      userData={userData}
      title={title}
      content={content}
      tags={tags}
      tagInput={tagInput}
      setTitle={setTitle}
      setContent={setContent}
      setTagInput={setTagInput}
      handleAddTag={handleAddTag}
      handleDeleteTag={handleDeleteTag}
      handleSubmit={handleSubmit}
    />
  );
}

export default CreateBlog;
