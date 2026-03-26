import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="not-found">
      <div className="not-found__box">
        <span className="not-found__emoji">🍕</span>
        <h1 className="not-found__title">404</h1>
        <p className="not-found__message">Denne siden finnes ikke</p>
        <a href="/" className="not-found__link">
          Tilbake til forsiden
        </a>
      </div>
    </div>
  );
};

export default NotFound;
