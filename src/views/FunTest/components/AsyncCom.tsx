import React from "react";
import AsyncComponentHOC from "@/components/AsyncComponentHOC";

const AsyncButton = AsyncComponentHOC(() => import("./Button"));

const AsyncComTest: React.FC = () => {
  return (
    <div className="async-com">
      <AsyncButton>test</AsyncButton>
    </div>
  );
};

export default AsyncComTest;
