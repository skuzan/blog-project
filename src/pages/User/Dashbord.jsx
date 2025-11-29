import { Link } from "react-router";

const Dashbord = () => {
  return (
    <div className="dashboard-page">

      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-subtitle">Manage your profile, posts, and account settings.</p>

      <div className="dashboard-grid">
        
        {/* PROFILE SETTINGS */}
        <div className="dashboard-card">
          <h2>Profile Settings</h2>
          <p>Edit your name, avatar, bio or account details.</p>
          <Link to="/profile" className="dashboard-btn">Edit Profile</Link>
        </div>

        {/* CREATE POST */}
        <div className="dashboard-card">
          <h2>Create New Post</h2>
          <p>Publish a new blog post with title, image and content.</p>
          <Link to="/addpost" className="dashboard-btn">Add Post</Link>
        </div>

        {/* MANAGE POSTS */}
        <div className="dashboard-card">
          <h2>My Posts</h2>
          <p>View, edit or delete the posts you have created.</p>
          <Link to="/myposts" className="dashboard-btn">Manage Posts</Link>
        </div>

        {/* DELETE ACCOUNT */}
        <div className="dashboard-card danger">
          <h2>Delete Account</h2>
          <p>This action cannot be undone. Your account and posts will be removed.</p>
          <button className="dashboard-btn danger-btn">Delete Account</button>
        </div>

      </div>
    </div>
  );
};

export default Dashbord;