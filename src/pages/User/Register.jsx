import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Register = ({ onCreateUser, setIsLogin }) => {
  const [fullName, setFullName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [bio, setBio] = useState(null);

  const navigate = useNavigate();

  const handleRegister = () => {

    const newUser = {
      username: username,
      email: email,
      password: password,
      fullName: fullName,
      avatar: avatar,
      bio: bio,
    };
    onCreateUser(newUser);
    setFullName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setAvatar("");
    setBio("");
  };

      useEffect(() => {
        const isUserLogged = localStorage.getItem("key");
        if (isUserLogged === "true") {
          setIsLogin(true);
          navigate("/dashboard");
        }
      }, []);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">
          Join the blog and start sharing your stories.
        </p>

        <form className="auth-form">
          {/* Full Name */}
          <div className="auth-field">
            <label className="auth-label">Full Name</label>
            <input
              type="text"
              className="auth-input"
              placeholder="e.g. Sinan Kuzan"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Username */}
          <div className="auth-field">
            <label className="auth-label">Username</label>
            <input
              type="text"
              className="auth-input"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              type="email"
              className="auth-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className="auth-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Avatar URL */}
          <div className="auth-field">
            <label className="auth-label">Avatar URL</label>
            <input
              type="text"
              className="auth-input"
              placeholder="/images/users/sinan.jpg"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>

          {/* Bio */}
          <div className="auth-field">
            <label className="auth-label">Bio</label>
            <textarea
              className="auth-input auth-textarea"
              placeholder="Write something about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>

          {/* Terms */}
          <div className="auth-extra">
            <label className="auth-checkbox-label">
              <input type="checkbox" className="auth-checkbox" />
              <span>I agree to the Terms & Privacy Policy</span>
            </label>
          </div>

          {/* Button */}
          <button type="button" className="auth-btn" onClick={handleRegister}>
            Register
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
