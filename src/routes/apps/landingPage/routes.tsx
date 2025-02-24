import { Navigate, Route, Routes } from "react-router";
import Home from "./home/Home";
import Layout from "./common/layouts/Layout";
import AboutUs from "./about-us/AboutUs";

export const LandingPageRoutes = {
  HOME: "home",
  ABOUT_US: "about-us",
  PROPERTIES: "properties",
  INSTALLMENTAL: "installmental",
  RESELL: "resell",
  CONTACT_US: "contact-us",
};

export const LandingPageRoot = "/";

export const LandingPageRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to={LandingPageRoutes.HOME} />} />
        <Route path={`${LandingPageRoutes.HOME}`} element={<Home />} />
        <Route path={`${LandingPageRoutes.ABOUT_US}`} element={<AboutUs />} />
      </Route>
    </Routes>
  );
};
