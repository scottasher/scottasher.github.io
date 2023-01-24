import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import img from "./pexels-olena-bohovyk-5345029.jpg";
const initState = {
  title: "Trucking",
  subTitle: "Login",
};

const passReset = {
  title: "Password Reset",
  subTitle:
    "An email will be sent to your inbox with further instructions on how to reset your password.",
};

const LoginLayout = (props) => {
  const [header, setHeader] = useState(initState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/forgot/password") {
      setHeader(passReset);
    } else {
      setHeader(initState);
    }
  }, [location]);

  // if (user.active) {
  //   navigate("/");
  // }

  return (
    <div className="bg-white font-family-karla h-screen">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex z-10 justify-center cursor-pointer md:justify-start pt-12 md:pl-12 md:-mb-24">
            <Link
              to="/"
              className="bg-black rounded text-white font-bold text-xl p-4"
            >
              Upseasonal
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center md:justify-start my-auto pt-8 md:pt-0 px-3">
            <Outlet />
          </div>
        </div>

        <div className="w-1/2 shadow-2xl">
          <img
            className="object-cover w-full h-screen hidden md:block"
            src={img}
            alt="background"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
