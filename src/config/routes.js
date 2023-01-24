import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/Main";
import ErrorPage from "../pages/Error";
import Resources from "../pages/Resources";
import Home from "../pages/Home";
import FindJob from "../pages/FindJob";
import Blog from "../pages/Blog";
import Login from "../pages/Login";
import LoginLayout from "../layouts/Login";
import Register from "../pages/Register";
import Help from "../pages/Help";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/find-job",
        element: <FindJob />,
      },
      {
        path: "/resources",
        element: <Resources />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/help",
        element: <Help />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/signup",
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <Register />,
      },
    ],
  },
]);

export default router;
