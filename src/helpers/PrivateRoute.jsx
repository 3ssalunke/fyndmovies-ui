import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./token";

function PrivateRoute({ children }) {
  const auth = isAuthenticated();
  return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
