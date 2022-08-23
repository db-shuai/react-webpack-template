import useCreation from "@/hooks/useCreation";
import React from "react";

const HOC = (rule: (props:any) => void) => (Component:any) => (props:any) => {
  return  useCreation(() => <Component {...props} />, [rule(props)])
}

export default HOC;