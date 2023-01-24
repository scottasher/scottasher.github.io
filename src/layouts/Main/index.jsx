import React, { useContext } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import Drawer from "../../components/Drawer";
import useWindowSize from "../../hooks/useWindowSize";
import Footer from "./Footer";
import LayoutHeader from "./LayoutHeader";
import { LayoutContext } from "../Root";

const menuItems = [
  // { title: "Home", path: "/" },
  { title: "Places", path: "/places" },
  { title: "Resouces", path: "/resources" },
  // { title: "Blog", path: "/blog" },
];

const MainLayout = (props) => {
  const { navOpen, setNavOpen } = useContext(LayoutContext);
  const windowSize = useWindowSize();

  const mobileNavBody = (
    <ul>
      {menuItems.map((menuItem, index) => {
        const linkStyle = `flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${
          menuItem.gap ? "mt-9" : "mt-2"
        } ${!navOpen && "justify-center"}`;
        const activeLinkStyle = "bg-light-white";
        return (
          <li key={index} onClick={() => setNavOpen(false)}>
            <NavLink
              to={menuItem.path}
              className={({ isActive, ...rest }) => {
                return isActive ? `${linkStyle} ${activeLinkStyle}` : linkStyle;
              }}
            >
              <span
                className={`${!navOpen && "hidden"} origin-left duration-200`}
              >
                {menuItem.title}
              </span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );

  const navTitle = (
    <Link to="/">
      <span className="text-white font-bold text-2xl">Seasonal Work</span>
    </Link>
  );

  return (
    <>
      <Drawer
        className="bg-dark-purple"
        noBorderHeader={true}
        position="left"
        title={navTitle}
        body={mobileNavBody}
        visible={navOpen}
        onClose={() => setNavOpen(false)}
      />
      <LayoutHeader navOpen={navOpen} setNavOpen={setNavOpen} />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
