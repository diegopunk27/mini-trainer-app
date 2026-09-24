import { AppContext } from '@global-contexts/AppContext';
import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useContext(AppContext)?.token;
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
