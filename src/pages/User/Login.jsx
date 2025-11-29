import { useState } from "react";
import { Link } from "react-router";
import { notify } from "../../Toasts/Toast";



const Login = ({ data }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLogin, setIsLogin] = useState(false);



  const userNames = data.map((d) => d.username);
  const userPassWord = data.map((d) => d.password);

  const handleUserLogin = () => {
    if (!email && !password) return notify.warning('Username and password are required.')
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">
          Login to continue reading and managing your posts.
        </p>

        <form className="auth-form">
          {/* Username or Email */}
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
      <Toasts />
    </div>
  );
};

export default Login;
