import Posts from "./Posts";
import Dashbord from "./User/Dashbord";

const Home = ({posts, setIsLogin}) => {
    

  return (
    <div>
      <Dashbord setIsLogin={setIsLogin}/>
        <Posts posts={posts} />
  
    </div>
  );
};

export default Home;
