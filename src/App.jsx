import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Kontakt from "./pages/Kontakt";
import About from "./pages/About";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import NotFound from "./pages/NotFound";
import Register from "./pages/User/Register";
import Login from "./pages/User/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDashboard from "./components/UserDashboard";
import AddPost from "./pages/User/AddPost";
import Dashbord from "./pages/User/Dashbord";
import Profile from "./pages/User/Profile";

const BASE_URL = "http://localhost:3005";

function App() {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");

  const navigate = useNavigate();
  //USERS Functions

  const getAllUsers = async () => {
    const response = await axios.get(BASE_URL + "/users");
    setData(response.data);
  };

  const createUser = async (newUser) => {
    const response = await axios.post(`${BASE_URL}/users`, newUser);
    return response.data;
  };

  const updateUser = async (userId, updatedUser) => {
    await axios.put(`${BASE_URL}/users/${userId}`, updatedUser);
    setData((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updatedUser } : u))
    );
  };

  const deleteUser = async (userId) => {
    await axios.delete(`${BASE_URL}/users/${userId}`);
  };

  // POST Functions

  const getAllPosts = async () => {
    const response = await axios.get(BASE_URL + "/posts");
    setPosts(response.data);
  };

  const addPost = async (newPost) => {
    await axios.post(`${BASE_URL}/posts`, newPost);
  };

  useEffect(() => {
    getAllUsers();
    getAllPosts();
  }, []);

  useEffect(() => {
    const isUserLogged = localStorage.getItem("key");
    const savedUserId = localStorage.getItem("userId");
    if (isUserLogged === "true" && savedUserId) {
      setIsLogin(true);
      setCurrentUserId(savedUserId);
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home posts={posts}  setIsLogin={setIsLogin}/>} />
        <Route path="/posts" element={<Posts posts={posts} />} />
        <Route path="/posts/:postId" element={<PostDetails posts={posts} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Kontakt />} />
        <Route
          path="/register"
          element={
            <Register
              onCreateUser={createUser}
              setIsLogin={setIsLogin}
              setCurrentUserId={setCurrentUserId}
            />
          }
        />
        <Route
          path="login"
          element={
            <Login
              data={data}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              setCurrentUserId={setCurrentUserId}
            />
          }
        />

        <Route element={<UserDashboard isLogin={isLogin} />}>
          <Route
            path="/dashboard"
            element={<Dashbord setIsLogin={setIsLogin} isLogin={isLogin} />}
          />
          <Route
            path="/addpost"
            element={<AddPost onAddPost={addPost} data={data} />}
          />
          <Route
            path="/profile"
            element={
              <Profile
                data={data}
                currentUserId={currentUserId}
                onUpdateUser={updateUser}
              />
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
