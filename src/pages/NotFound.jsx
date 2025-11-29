import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">Üzgünüz, aradığınız sayfa bulunamadı.</p>

      <Link to="/" className="notfound-btn">
        Anasayfaya Dön
      </Link>
    </div>
  );
};

export default NotFound;