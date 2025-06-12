import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import NavbarLayout from './Layouts/NavbarLayout';
import Login from './Pages/Login';
import Register from './Pages/Register';
import EditPost from './Pages/EditPost';
import Loader from './Components/Loader';
import AddPost from './Pages/AddPost';
import { useEffect, useRef, useState } from 'react';
import { setNavigator } from './utils/navigate';
import Error404 from './Pages/Error404';
import { useLoading } from './Contexts/LoadingContext';
import { useAuth } from './Contexts/AuthContext';
import api from './utils/api';
import { showConfirmAlert, showErrorAlert, showSuccessAlert } from './utils/alerts';

function App() {
  const navigate = useNavigate();
  const searchInput = useRef();
  const { showLoading, hideLoading } = useLoading();
  const { isLoggedIn, user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [hasFetchedPosts, setHasFetchedPosts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  useEffect(() => {
    const getPosts = async () => {
      showLoading();
      try {
        const { data } = await api.get("/posts");
        setPosts(data.data);
      } catch (error) {
        console.log(error);
        showErrorAlert(error.message)
      } finally {
        hideLoading();
        setHasFetchedPosts(true);
      }
    };
    getPosts();
  }, []);

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

  return (
    <div className="flex flex-col min-h-dvh dark:text-white">
      <Loader />
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route element={<NavbarLayout />}>
          <Route
            path="/"
            element={
              <Home
                posts={posts}
                setPosts={setPosts}
                hasFetchedPosts={hasFetchedPosts}
                searchInput={searchInput}
                searchValue={searchValue}
                handleSearch={handleSearch}
                currentPage={currentPage}
                handlePagination={handlePagination}
                setCurrentPage={setCurrentPage}
                handleDeletePost={handleDeletePost}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path="/edit/:id" element={<EditPost posts={ posts } setPosts={ setPosts }  />} />
          <Route path="/add" element={<AddPost posts={ posts } setPosts={ setPosts } setCurrentPage={ setCurrentPage } />} />
        </Route>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
