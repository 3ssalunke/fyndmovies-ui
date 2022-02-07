import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { GlobalContext } from "../contexts";
import { clearMovies, setSearchedMovies } from "../contexts/actions";
import debounce from "../helpers/debounce";

const Search = ({ forDashboard }) => {
  const [, dispatch] = useContext(GlobalContext);

  const handleSearch = debounce((e) => {
    if (e.target.value) {
      setSearchedMovies(dispatch, { searchText: e.target.value });
    } else {
      clearMovies(dispatch);
    }
  }, 200);

  return (
    <form
      className={`${
        forDashboard
          ? "w-full px-5 mb-1 md:mb-0 md:w-1/3 md:px-10"
          : "w-1/2 md:w-auto absolute cursor-pointer right-0"
      }`}
    >
      <div
        className={`bg-background w-full rounded-full flex p-2.5 shadow-2xl relative right-0 ${
          forDashboard ? "h-12" : "h-10"
        } flex items-center`}
      >
        <FaSearch size={20} color="white" />
        <input
          autoComplete="off"
          className={`bg-background border-none outline-none ml-3 text-white w-full
          }`}
          placeholder={`${
            !forDashboard ? "search for movie..." : "search movie for edit..."
          }`}
          onChange={handleSearch}
        />
      </div>
    </form>
  );
};

export default Search;
