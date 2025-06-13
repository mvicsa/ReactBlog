import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useEffect, useRef, useState } from "react";
import { useLoading } from "../Contexts/LoadingContext";
import { showConfirmAlert, showErrorAlert, showSuccessAlert } from "../utils/alerts";
import api from "../utils/api";
import { useAuth } from "../Contexts/AuthContext";

const BlogLayout = () => {
  const [ posts, setPosts ] = useState([]);
  const [ hasFetchedPosts, setHasFetchedPosts ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ searchValue, setSearchValue ] = useState("");
  const searchInput = useRef();

  const { user } = useAuth();

  const { showLoading, hideLoading } = useLoading();

  const handleSearch = (e) => {
    e.preventDefault();
    const value = searchInput.current.value;
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handlePagination = (page) => setCurrentPage(page);

  const handleDeletePost = async (id) => {
    showLoading();
    try {
      const confirm = await showConfirmAlert("Delete this post?", "This action cannot be undone.");
      const userAccess = posts.filter(post => post._id === id && post.createdBy._id === user._id);
      if (confirm.isConfirmed && userAccess.length) {
        const { status } = await api.delete(`/posts/${id}`);
        if (status === 200) {
          setPosts(posts.filter(post => post._id !== id));
          showSuccessAlert("Post Deleted Successfully!");
          setCurrentPage(1);
        }
      }
    } catch (error) {
      showErrorAlert(error.message);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      showLoading();
      try {
        const { data } = await api.get("/posts");
        setPosts(data.data);
      } catch (error) {
        showErrorAlert(error.message);
      } finally {
        hideLoading();
        setHasFetchedPosts(true);
      }
    };
    getPosts();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet context={{
        posts,
        setPosts,
        hasFetchedPosts,
        currentPage,
        setCurrentPage,
        searchValue,
        setSearchValue,
        searchInput,
        handleSearch,
        handlePagination,
        handleDeletePost
      }} />
    </>
  );
}

export default BlogLayout;
