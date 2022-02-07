import { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import AddMovieModal from "./AddMovieModal";
import DashboardCard from "./DashboardCard";
import Search from "./Search";

const DashboardContainer = ({ heading, data = [] }) => {
  const [openAddMovieModal, setOpenAddMovieModal] = useState(false);
  return (
    <>
      <div className="flex flex-col mt-20">
        <h1 className="px-5 md:px-10 py-3 lg:px-16 mb-5 font-semibold text-2xl w-full md:w-1/3">
          {heading}
        </h1>
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row items-center justify-evenly ">
            <Search forDashboard={true} />
            <div className="bg-background flex items-center w-2/3 px-5 md:w-1/4 md:px-10 h-12 justify-center rounded-full shadow-2xl cursor-pointer">
              <MdOutlineAdd
                fontWeight={50}
                size={20}
                color="white"
                className="mr-2"
              />
              <p
                className="text-white font-normal"
                onClick={() => setOpenAddMovieModal((prev) => !prev)}
              >
                Add New Movie
              </p>
            </div>
          </div>
        </div>
        {openAddMovieModal && (
          <AddMovieModal setOpenAddMovieModal={setOpenAddMovieModal} />
        )}
        <div className="w-full px-10 mt-5 mb-16 flex flex-col justify-center">
          {data?.map((item, index) => (
            <DashboardCard item={item} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardContainer;
