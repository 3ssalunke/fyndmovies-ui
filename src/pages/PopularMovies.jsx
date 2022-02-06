import { useContext, useEffect, useState } from "react";

import Container from "../components/Container";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { GlobalContext } from "../contexts";
import { setPopularMovies } from "../contexts/actions";

const PopularMovies = () => {
  const [{ movies, loading }, dispatch] = useContext(GlobalContext);
  const [pageNumber, setPageNumber] = useState(1);

  const handleLoadMore = () => {
    setPageNumber((prev) => prev + 1);
    setPopularMovies(dispatch, { pageNumber });
  };

  useEffect(() => {
    if (movies.length < 30) {
      setPopularMovies(dispatch);
    }
  }, [dispatch, movies]);

  return (
    <div className="bg-white">
      <Navbar />
      <Layout>
        <Container
          heading="Popular Movies"
          data={movies}
          handleLoadMore={handleLoadMore}
          loading={loading}
        />
      </Layout>
    </div>
  );
};

export default PopularMovies;
