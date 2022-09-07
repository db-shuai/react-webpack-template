import React, { ReactPortal } from "react";
import { Outlet } from "react-router-dom";

// const BlankLayout = ({ children }: ReactPortal) => <>{children}</>;
//

const BlankLayout = ({ children }: ReactPortal) => (
  <>
    <Outlet />
  </>
);

export default BlankLayout;
