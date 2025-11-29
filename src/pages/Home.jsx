import Posts from "./Posts";

const Home = ({posts}) => {
    

  return (
    <div>
        <Posts posts={posts} />
  
    </div>
  );
};

export default Home;
