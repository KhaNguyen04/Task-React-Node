import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated, selectLoading } from '../store/userSlice/user.selectors';
import { verifyToken } from '../store/userSlice/user.thunk';

const AuthGuard = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AuthGuard;
