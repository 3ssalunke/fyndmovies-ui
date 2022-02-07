import React, { useEffect, useState } from "react";
import { getToken } from "../helpers/token";

const EditMovieModal = ({ setOpenEditModal, item }) => {
  const [director, setDirector] = useState(item.director);
  const [imdbScore, setImdbScore] = useState(item.imdb_score);
  const [popularity, setPopularity] = useState(item["99popularity"]);
  const [customGenres, setCustomGenres] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([...item.genre]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    (async function () {
      const res = await fetch(
        `${process.env.REACT_APP_API_HOSTNAME}/admin/genres`,
        {
          method: "GET",
          headers: new Headers({
            Authorization: "Bearer " + getToken(),
            "Content-Type": "application/json",
          }),
        }
      );
      const { result } = await res.json();
      setGenres([...result.genres]);
    })();
  }, []);

  const handleGenreSelect = (e) => {
    setSelectedGenres(
      [...e.target.selectedOptions].map((option) => option.value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const addedGenres = customGenres
      ?.split(",")
      .filter((val) => val.trim() && val !== "")
      .map((val) => val.charAt(0).toUpperCase() + val.slice(1));
    const genre =
      addedGenres.length > 0
        ? [...selectedGenres, ...addedGenres]
        : [...selectedGenres];
    (async function () {
      const movieData = {
        "99popularity": popularity,
        imdb_score: imdbScore,
        director: director.charAt(0).toUpperCase() + director.slice(1),
        genre,
      };
      await fetch(
        `${process.env.REACT_APP_API_HOSTNAME}/admin/movie/${item._id}`,
        {
          method: "PUT",
          headers: new Headers({
            Authorization: "Bearer " + getToken(),
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(movieData),
        }
      );
      setOpenEditModal(false);
    })();
  };

  return (
    <div className="fixed w-full md:w-1/2 bg-white top-5 md:top-0 left -0 md:left-1/4 z-50 shadow-xl">
      <p
        className="absolute top-1 right-2 font-medium cursor-pointer"
        onClick={() => setOpenEditModal((prev) => !prev)}
      >
        X
      </p>
      <form onSubmit={handleSubmit}>
        <h1 className="py-2 px-4 text-2xl font-medium text-center">
          Edit Movie
        </h1>
        <div className="flex items-center w-full">
          <div className="w-1/2">
            <div className="mb-5 mx-2 flex flex-col items-start justify-start">
              <label htmlFor="email" className="text-xl font-medium">
                Name
              </label>
              <input
                type="text"
                id="text"
                value={item.name}
                autoComplete="off"
                autoCapitalize="off"
                className="p-2 text-lg w-full h-10 rounded-md border-2 outline-none"
                disabled
              />
            </div>
            <div className="mb-5 mx-2 flex flex-col items-start justify-start">
              <label htmlFor="director" className="text-xl font-medium">
                Director
              </label>
              <input
                type="text"
                id="director"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                autoComplete="off"
                autoCapitalize="off"
                className="p-2 text-lg w-full h-10 rounded-md border-2 outline-none"
                required
              />
            </div>
            <div className="mb-5 mx-2 flex flex-col items-start justify-start">
              <label htmlFor="genres" className="text-xl font-medium">
                Genres
              </label>
              <select
                required
                onChange={handleGenreSelect}
                multiple
                className="w-full outline-none"
              >
                <option disabled>Select Genres</option>
                {genres.length &&
                  genres.map((genre, index) => (
                    <option
                      className="cursor-pointer"
                      key={index}
                      value={genre}
                    >
                      {genre}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="w-1/2">
            <div className="mb-5 mx-2 flex flex-col items-start justify-start">
              <label htmlFor="imdb" className="text-xl font-medium">
                IMDB Score
              </label>
              <input
                type="number"
                step="0.01"
                id="imdb"
                value={imdbScore}
                onChange={(e) => setImdbScore(e.target.value)}
                className="p-2 text-lg w-full h-10 rounded-md border-2 outline-none"
                required
              />
            </div>
            <div className="mb-5 mx-2 flex flex-col items-start justify-start">
              <label htmlFor="popularity" className="text-xl font-medium">
                99Popularity Score
              </label>
              <input
                type="number"
                id="popularity"
                value={popularity}
                onChange={(e) => setPopularity(e.target.value)}
                className="p-2 text-lg w-full h-10 rounded-md border-2 outline-none"
                required
              />
            </div>
            <div className="mb-5 mx-2 flex flex-col items-start justify-start">
              <label htmlFor="popularity" className="text-xl font-medium">
                Add Genre
              </label>
              <input
                type="text"
                id="text"
                value={customGenres}
                onChange={(e) => setCustomGenres(e.target.value)}
                placeholder="add genre seperated by commas..."
                autoComplete="off"
                autoCapitalize="off"
                className="p-2 text-lg w-full h-10 rounded-md border-2 outline-none"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-3">
          <button
            type="submit"
            className="w-1/3 px-4 py-2 text-xl text-white bg-background rounded-xl"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovieModal;
