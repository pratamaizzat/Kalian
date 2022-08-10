import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h1 className="text">Hello From Home</h1>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/this-route-is-not-found">Not Found</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
