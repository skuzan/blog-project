import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { notify } from "../../Toasts/toast";

const Register = ({ onCreateUser, setIsLogin, setCurrentUserId }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!fullName || !username || !email || !password) {
      return notify.error(
        "Full name, username, email and password are required."
      );
    }

    const newUser = {
      username: username,
      email: email,
      password: password,
      fullName: fullName,
      avatar: avatar,
      bio: bio,
    };

    try {
      const createdUser = await onCreateUser(newUser); 
      setIsLogin(true);
      setCurrentUserId(createdUser.id);
      localStorage.setItem("key", "true");
      localStorage.setItem("userId", String(createdUser.id));

      notify.success("Account created successfully. Welcome!");
      navigate("/dashboard");

      // Formu temizle
      setFullName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setAvatar("");
      setBio("");
    } catch (err) {
      
      notify.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const isUserLogged = localStorage.getItem("key");
    const savedUserId = localStorage.getItem("userId");
    if (isUserLogged === "true" && savedUserId) {
      setIsLogin(true);
      setCurrentUserId(savedUserId);
      navigate("/dashboard");
    }
  }, [navigate, setIsLogin, setCurrentUserId]);

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
