import Search from "./Search";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { clearToken, isAuthenticated } from "../helpers/token";

const Navbar = ({ forDashboard }) => {
  const auth = isAuthenticated();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/");
  };
  return (
    <div
      style={{ height: "75px" }}
      className={"bg-white fixed w-full top-0 shadow-xl z-50 p-4"}
    >
      <div className="flex justify-start items-center relative w-full">
        <img src={logo} alt="logo" className="h-10 w-10 mr-2 hidden md:block" />
        <Link to="/">
          <h1 className="text-4xl font-bold align-baseline hidden md:block">
            Fynd Movies
          </h1>
        </Link>
        {auth ? (
          <Link
            to="/dashboard"
            className="text-center align-middle md:ml-6 cursor-pointer"
          >
            Admin-dashboard
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-center align-middle md:ml-6 cursor-pointer"
          >
            Admin-login
          </Link>
        )}
        {auth && (
          <p
            className="text-center align-middle md:ml-6 cursor-pointer"
            onClick={handleLogout}
          >
            logout
          </p>
        )}
        {!forDashboard && <Search />}
      </div>
    </div>
  );
};

export default Navbar;
