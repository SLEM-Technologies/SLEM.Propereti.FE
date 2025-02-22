import { Route, Routes } from "react-router";
import Home from "./home/Home";
import Layout from "./common/layouts/Layout";

export const LandingPageRoutes = {
  HOME: "home",
  ABOUT_US: "about-us",
  PROPERTIES: "properties",
  INSTALLMENTAL: "installmental",
  RESELL: "resell",
  CONTACT_US: "contact-us",
};

export const LandingPageRoot = "/landing-page";

export const LandingPageRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path={`${LandingPageRoutes.HOME}`} element={<Home />} />
      </Route>
    </Routes>
  );
};
