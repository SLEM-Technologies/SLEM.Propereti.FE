import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import {
  LandingPageRouter,
  LandingPageRoot,
} from "@/routes/apps/landingPage/routes";
import AppLayout from "@/common/layouts/AppLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to={LandingPageRoot} />} />
            <Route
              path={`${LandingPageRoot}/*`}
              element={<LandingPageRouter />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
