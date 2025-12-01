import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { notify } from "../../Toasts/toast";

const Login = ({ data, setIsLogin, setCurrentUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUserLogin = () => {
    if (!email || !password) {
      return notify.error("Username and password are required.");
    }

    const user = data.find((u) => u.email === email && u.password === password);

    if (!user) {
      return notify.error("Incorrect username or password. Please try again.");
    }

    // 3) Başarılı login
    setIsLogin(true);
    setCurrentUserId(user.id);

    localStorage.setItem("key", "true");
    localStorage.setItem("userId", user.id);

    notify.success(`Welcome back, ${user.fullName || user.username}!`);
    navigate("/dashboard");
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
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">
          Login to continue reading and managing your posts.
        </p>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          {/* Email */}
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              type="text"
              className="auth-input"
              placeholder="your email"
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

          {/* Remember / Forgot */}
          <div className="auth-extra-row">
            <label className="auth-checkbox-label">
              <input type="checkbox" className="auth-checkbox" />
              <span>Remember me</span>
            </label>

            <button type="button" className="auth-link-btn">
              Forgot password?
            </button>
          </div>

          {/* Button */}
          <button onClick={handleUserLogin} type="button" className="auth-btn">
            Login
          </button>
        </form>

        <p className="auth-footer-text">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="auth-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
