import { useContext, useState } from "react";
import { GlobalContext } from "../contexts";
import { clearMovies, setPopularMovies } from "../contexts/actions";
import { getToken } from "../helpers/token";
import EditMovieModal from "./EditMovieModal";

const DashboardCard = ({ item }) => {
  const [, dispatch] = useContext(GlobalContext);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleDelete = () => {
    const confirmation = prompt("Are you sure?");
    if (confirmation) {
      fetch(`${process.env.REACT_APP_API_HOSTNAME}/admin/movie/${item._id}`, {
        method: "DELETE",
        headers: new Headers({
          Authorization: "Bearer " + getToken(),
          "Content-Type": "application/json",
        }),
      });
    }
    clearMovies(dispatch);
    setPopularMovies(dispatch);
  };

  return (
    <>
      <div className="py-2 px-1 border-b-2 flex items-center relative">
        <div className="w-2/3 flex items-center">
          <h1 className="text-xl font-medium">{item.name}</h1>
          <p className="ml-4">
            Directed By <span>{item.director}</span>
          </p>
        </div>
        <div className="flex items-center justify-star w-1/3">
          <div className="p-2 rounded-lg border-2 border-black mr-1">
            <button
              onClick={() => setOpenEditModal((prev) => !prev)}
              className="font-medium"
            >
              Edit Movie
            </button>
          </div>
          <div className="bg-background p-2 rounded-lg border-2 border-black mr-1">
            <button onClick={handleDelete} className="text-white font-medium">
              Delete Movie
            </button>
          </div>
        </div>
        {openEditModal && (
          <EditMovieModal item={item} setOpenEditModal={setOpenEditModal} />
        )}
      </div>
    </>
  );
};

export default DashboardCard;
