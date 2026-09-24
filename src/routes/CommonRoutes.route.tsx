import { HomePage } from '@common-pages/index';
import { Route, Routes } from 'react-router';

const CommonRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default CommonRoutes;
