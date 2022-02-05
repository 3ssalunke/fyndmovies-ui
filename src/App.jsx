import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ContextProvider } from "./contexts";
import NotFound from "./pages/NotFound";
import PopularMovies from "./pages/PopularMovies";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PopularMovies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
