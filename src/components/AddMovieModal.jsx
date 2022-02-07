import React, { useEffect, useRef, useState } from "react";
import { getToken } from "../helpers/token";

const AddMovieModal = ({ setOpenAddMovieModal }) => {
  const nameRef = useRef(null);
  const directorRef = useRef(null);
  const imdbScoreRef = useRef(null);
  const populatityRef = useRef(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
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
    (async function () {
      const movieData = {
        "99popularity": populatityRef.current.value,
        name:
          nameRef.current.value.charAt(0).toUpperCase() +
          nameRef.current.value.slice(1),
        imdb_score: imdbScoreRef.current.value,
        director:
          directorRef.current.value.charAt(0).toUpperCase() +
          directorRef.current.value.slice(1),
        genre: [...selectedGenres],
      };
      await fetch(`${process.env.REACT_APP_API_HOSTNAME}/admin/movie`, {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + getToken(),
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(movieData),
      });
      setOpenAddMovieModal(false);
    })();
  };

  return (
    <div className="absolute w-1/2 bg-white top-1/5 left-1/4 z-50 shadow-xl">
      <p
        className="absolute top-1 right-2 font-medium cursor-pointer"
        onClick={() => setOpenAddMovieModal((prev) => !prev)}
      >
        X
      </p>
      <form onSubmit={handleSubmit}>
        <h1 className="py-2 px-4 text-2xl font-medium text-center">
          Add Movie
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
                ref={nameRef}
                autoComplete="off"
                autoCapitalize="off"
                className="p-2 text-lg w-full h-10 rounded-md border-2 outline-none"
                required
              />
            </div>
            <div className="mb-5 mx-2 flex flex-col items-start justify-start">
              <label htmlFor="director" className="text-xl font-medium">
                Director
              </label>
              <input
                type="text"
                id="director"
                ref={directorRef}
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
                ref={imdbScoreRef}
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
                ref={populatityRef}
                className="p-2 text-lg w-full h-10 rounded-md border-2 outline-none"
                required
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

export default AddMovieModal;
