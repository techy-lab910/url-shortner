import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AppLayout from './layouts/app-layout'
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/Landing';
import Link from './pages/Link';
import RedirectLink from './pages/RedirectLink';
import UrlProvider from './context';
import RequireAuth from './components/require-auth';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "/dashboard",
        element: <RequireAuth> <Dashboard /> </RequireAuth>
      },
      {
        path: "/auth",
        element: <Auth />
      },
      {
        path: "/link/:id",
        element: <RequireAuth>
          <Link />
        </RequireAuth>
      },
      {
        path: "/:id",
        element: <RedirectLink />
      },
    ]
  }
]);

const App = () => {
  return <div className='selection:text-yellow-300 selection:bg-green-900 bg-gray-900 '>
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider></div>
}

export default App