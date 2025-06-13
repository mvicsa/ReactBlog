import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import BlogLayout from './Layouts/BlogLayout';
import Login from './Pages/Login';
import Register from './Pages/Register';
import EditPost from './Pages/EditPost';
import Loader from './Components/Loader';
import AddPost from './Pages/AddPost';
import { useEffect } from 'react';
import { setNavigator } from './utils/navigate';
import Error404 from './Pages/Error404';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-dvh dark:text-white">
      <Loader />
      <Routes>
        <Route element={<BlogLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/add" element={<AddPost />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
