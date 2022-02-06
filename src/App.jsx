import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ContextProvider } from "./contexts";
import PrivateRoute from "./helpers/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PopularMovies from "./pages/PopularMovies";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PopularMovies />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
