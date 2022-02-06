import { useContext, useEffect } from "react";
import DashboardContainer from "../components/DashboardContainer";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { GlobalContext } from "../contexts";
import { clearMovies } from "../contexts/actions";

const AdminDashboard = () => {
  const [{ movies }, dispatch] = useContext(GlobalContext);

  useEffect(() => {
    clearMovies(dispatch);
  }, [dispatch]);

  return (
    <div className="bg-white">
      <Navbar forDashboard={true} />
      <Layout>
        <DashboardContainer heading="Manage Movies" data={movies} />
      </Layout>
    </div>
  );
};

export default AdminDashboard;
