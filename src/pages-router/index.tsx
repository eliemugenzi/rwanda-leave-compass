
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';

/**
 * Pages Router component that mimics Next.js routing based on file system
 */
const PagesRouter: React.FC = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
    </Routes>
  );
};

export default PagesRouter;
