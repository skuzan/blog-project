import { useState, useEffect } from "react";
import { Link, Links, useNavigate } from "react-router";
import { notify } from "../../Toasts/toast";

const Login = ({ data, isLogin, setIsLogin }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


  const navigate = useNavigate();

  const emailValidation = () => {
    const userEmail = data.map((d) => d.email);
    return userEmail.includes(email);
  };
  const passwordValidation = () => {
    const userPassWord = data.map((d) => d.password);
    return userPassWord.includes(password);
  };

  const handleUserLogin = () => {
    if (!email && !password)
      return notify.error("Username and password are required.");
    if (emailValidation() && passwordValidation) {
      setIsLogin(true);
      navigate("/dashboard");
    } else {
      notify.error("Invalid username or password. Please try again.");
    }
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
    </div>
  );
};

export default Login;
