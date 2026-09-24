import { AppContext } from '@global-contexts/AppContext';
import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router';

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const token = useContext(AppContext)?.token;
  return !token ? <>{children}</> : <Navigate to="/home" />;
};

export default PublicRoute;
