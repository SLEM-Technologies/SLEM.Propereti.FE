import { Outlet } from "react-router";

function AppLayout() {
  return (
    <main className="w-full min-h-screen">
      <Outlet />
    </main>
  );
}

export default AppLayout;
