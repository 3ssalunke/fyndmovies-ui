import Search from "./Search";
import logo from "../images/logo.png";

const Navbar = () => {
  return (
    <div
      style={{ height: "75px" }}
      className={"bg-white fixed w-full top-0 shadow-xl z-50 p-4"}
    >
      <div className="flex justify-start items-center relative w-full">
        <img src={logo} alt="logo" className="h-10 w-10 mr-2 hidden md:block" />
        <h1 className="text-4xl font-bold align-baseline hidden md:block">
          Fynd Movies
        </h1>
        <p className="text-center align-middle md:ml-6 cursor-pointer">
          Admin login
        </p>
        <Search />
      </div>
    </div>
  );
};

export default Navbar;
