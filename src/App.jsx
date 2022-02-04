import { useEffect, useState } from "react";
import Container from "./components/Container";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async function () {
      const res = await fetch(`${process.env.REACT_APP_HOSTNAME}/movies`);
      const {
        result: { movies },
      } = await res.json();
      setMovies(movies);
    })();
  }, []);

  return (
    <div className="bg-white">
      <Navbar />
      <Layout>
        <Container data={movies} />
      </Layout>
    </div>
  );
}

export default App;
