import { useEffect } from "react";
import Posts from "./Posts";
import Dashbord from "./User/Dashbord";

const Home = ({ posts, setIsLogin, setCurrentUserId, isLogin }) => {
  useEffect(() => {
    const isUserLogged = localStorage.getItem("key");
    const savedUserId = localStorage.getItem("userId");
    if (isUserLogged === "true" && savedUserId) {
      setIsLogin(true);
      setCurrentUserId(savedUserId);
    }
  }, []);


  return (
    <div>
      {isLogin && (
        <Dashbord setIsLogin={setIsLogin} setCurrentUserId={setCurrentUserId}  isLogin={isLogin}/>
      )}
      <Posts posts={posts} />
    </div>
  );
};

export default Home;
