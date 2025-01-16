import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated  } from "../store/userSlice/user.selectors";

const AuthGuard = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated  ? children : <Navigate to="/login" replace />;
};

export default AuthGuard;