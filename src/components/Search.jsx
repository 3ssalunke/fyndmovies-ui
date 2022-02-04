import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    setInput(e.target.value);
    if (input.length >= 3) {
    }
  };

  return (
    <form className="absolute cursor-pointer right-0">
      <div
        className={
          "bg-background h-10 w-auto rounded-full flex p-2.5 shadow-2xl relative right-0"
        }
      >
        <FaSearch size={20} color="white" />
        <input
          autoComplete="off"
          className={
            "bg-background border-none outline-none md:max-w-3xl ml-3 text-white"
          }
          placeholder="search for movie..."
          onChange={handleSearch}
        />
      </div>
    </form>
  );
};

export default Search;
