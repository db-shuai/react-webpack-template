import React, { useEffect, useState } from "react";

const HOC = (Component: any) => (props: any) => {
  const [com, setCom] = useState<any>({});

  useEffect(() => {
    Component()
      .then((cmp: any) => {
        // console.log("cmp: ", cmp);
        setCom({ default: cmp.default });
      })
      .catch(() => {});
  }, []);
  
  // console.log("com.default: ", com.default);

  if (com.default) {
    const C = com.default;
    return <C {...props} />;
  }

  return null;
};

export default HOC;
