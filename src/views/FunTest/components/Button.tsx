import { Button } from "antd";
import React, { ReactPortal } from "react";

const TButton: React.FC<any> = ({ children }: ReactPortal) => {
  return <Button>{children}</Button>;
};

export default TButton;
