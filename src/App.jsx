import React from "react";
import router from "./config/routes";
import { RouterProvider, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/Main";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Blog from "./pages/Blog";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Places from "./pages/Places";
import LoginLayout from "./layouts/Login";
import UserProfile from "./pages/Account/Profile";
import PlaceCreate from "./pages/Places/Create";
import PlaceShow from "./pages/Places/Show";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="places" element={<Places />} />
        <Route path="places/create" element={<PlaceCreate />} />
        <Route path="places/:id" element={<PlaceShow />} />
        {/* <Route path="blog" element={<Blog />} /> */}
        <Route path="resources" element={<Resources />} />
        <Route path="help" element={<Help />} />
        <Route path="account/profile" element={<UserProfile />} />
      </Route>
      <Route path="/" element={<LoginLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
