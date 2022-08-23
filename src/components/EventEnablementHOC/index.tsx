import { useEffect } from "react";
import React from "react";

interface Props {
  target: string;
  way?: string;
  handler: () => void;
}

const HOC =
  ({ target, way = "click", handler = () => {} }: Props) =>
  (Component: any) =>
  (props: any) => {
    useEffect(() => {
      const res = document.querySelector(target);
      console.log('res: ', res);
      res?.addEventListener(way, handler);
      return () => {
        res?.removeEventListener(way, handler);
      };
    }, []);

    return <Component {...props} />;
  };

export default HOC;
