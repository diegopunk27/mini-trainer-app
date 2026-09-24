import { AppLayout } from '@common/components/AppLayout';
import { AppProvider } from '@global-contexts/AppContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicRoute from './Public.route';
import PrivateRoute from './Private.route';
import { LoginPage } from '@global-pages/index';
import CommonRoutes from './CommonRoutes.route';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <AppLayout>
                  <CommonRoutes />
                </AppLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
