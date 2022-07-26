import React, { Suspense } from "react";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import routes from "./routes";
/* ts todo */
const renderRoutes = (routes: Array<any>) => {
  const retRoutes = routes.map((route: any, index: number) => {
    if (route.redirect) {
      return (
        <Route
          path="/"
          key={route.path || index}
          element={
            <Navigate
              // key={route.path || index}
              // exact={route.exact}
              // strict={route.strict}
              // from={route.path}
              to={route.redirect}
            />
          }
        />
      );
    }
    return (
      <Route
        key={route.path || index}
        path={route.path}
        // exact={route.exact}
        // strict={route.strict}
        element={
          <Suspense fallback={<div>路由懒加载...</div>}>
            <route.component />
          </Suspense>
        }
      >
        {route?.children?.length ? renderRoutes(route?.children) : null}
      </Route>
    );
  });
  return retRoutes;
};

const AppRouter = () => (
  <HashRouter>
    <Routes>{renderRoutes(routes)}</Routes>
  </HashRouter>
);

export default AppRouter;
