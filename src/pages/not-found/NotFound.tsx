import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.warn('404: No route matched:', location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="not-found">
      <div className="not-found__box">
        <span className="not-found__emoji">🍕</span>
        <h1 className="not-found__title">404</h1>
        <p className="not-found__message">Denne siden finnes ikke</p>
        <Link to="/" className="not-found__link">
          Tilbake til forsiden
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
