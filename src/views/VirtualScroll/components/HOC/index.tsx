import { useEffect, useState } from "react";
import { Spin } from "antd";
import React from "react";

const waitList: any = []; //等待队列
let isRender: boolean = false; //控制渲染条件

const waitRender = () => {
  const res = waitList.shift();
  if (!res) return;
  setTimeout(() => {
    res();
  }, 500); //为演示效果加入一个延长时间
};

const HOC = (Component: any) => (props: any) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    console.log("waitList: ", waitList);
    waitList.push(() => {
      setShow(true);
    });
    if (!isRender) {
      console.log("props: ", props);
      waitRender();
      isRender = true;
    }
  }, []);

  return show ? (
    <Component waitRender={waitRender} {...props} />
  ) : (
    <div style={{ margin: 25 }}>
      <Spin />
      加载中
    </div>
  );
};

export default HOC;
