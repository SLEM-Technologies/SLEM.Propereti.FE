import { Outlet } from "react-router";

function AppLayout() {
  return (
    <main className="w-full max-h-screen">
      <Outlet />
    </main>
  );
}

export default AppLayout;
