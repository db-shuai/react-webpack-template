import { Button } from "antd";
import React, { useState } from "react";
import useMount from "@/hooks/useMount";
import useUnmount from "@/hooks/useUnmount";

const Child = () => {
  useMount(() => {
    console.log("首次渲染: ");
  });

  useUnmount(() => {
    console.log("组件已卸载: ");
  });

  return <div>你好，我是小杜杜</div>;
};

const Index: React.FC<any> = (props) => {
  const [flag, setFlag] = useState<boolean>(false);

  return (
    <div style={{ padding: 50 }}>
      <Button
        color="primary"
        onClick={() => {
          setFlag((v) => !v);
        }}
      >
        切换 {flag ? "unmount" : "mount"}
      </Button>
      {flag && <Child />}
    </div>
  );
};

export default Index;
