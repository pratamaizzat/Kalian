import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <main className="not-found">
      <div className="not-found-content">
        <h1 className="text text-404">404</h1>
        <h3 className="text text-404-caption">
          This is not the web page you are looking for.
        </h3>

        <button onClick={handleBackHome} className="btn-not-found">
          Go Back
        </button>
      </div>
    </main>
  );
};

export default NotFound;
