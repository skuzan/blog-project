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

const BASE_URL = "http://localhost:3005";

function App() {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

    const navigate = useNavigate();
  //USERS Functions

  const getAllUsers = async () => {
    const response = await axios.get(BASE_URL + "/users");
    setData(response.data);
  };

  const createUser = async (newUser) => {
    await axios.post(`${BASE_URL}/users`, newUser);
  };

  const updateUser = async (userId, updatedUser) => {
    await axios.put(`${BASE_URL}/users/${userId}`, updatedUser);
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
      if (isUserLogged === "true") {
        setIsLogin(true);
        navigate("/dashboard");
      }
    }, []);
  
    useEffect(() => {
      if (isLogin) {
        localStorage.setItem("key", true);
      }
    }, [isLogin]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/posts" element={<Posts posts={posts} />} />
        <Route path="/posts/:postId" element={<PostDetails posts={posts} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Kontakt />} />
        <Route
          path="/register"
          element={<Register onCreateUser={createUser} setIsLogin = {setIsLogin} />}
        />
        <Route path="login" element={<Login data={data} isLogin= {isLogin} setIsLogin = {setIsLogin} />} />

        <Route element={<UserDashboard isLogin= {isLogin} />}>
          <Route path="/dashboard" element={<Dashbord />} />
          <Route path="/addpost" element={<AddPost onAddPost = {addPost} data = {data}/>} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
