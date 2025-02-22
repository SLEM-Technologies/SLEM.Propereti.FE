import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full h-full overflow-y-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
