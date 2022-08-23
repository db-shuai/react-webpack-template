import { Button } from "antd";
import React, { ReactPortal } from "react";
import useReactive from "@/hooks/useReactive";
import CreationHOC from "@/components/CreationHOC";

const Child: React.FC<any> = (props) => {
  return (
    <div style={{ marginBottom: 8 }}>
      {console.log("渲染")}
      数字: {props.count}
    </div>
  );
};

const ChildHoc = CreationHOC((props:any)=> props['count'])(Child)


const Index: React.FC<any> = (props) => {
  const state = useReactive<any>({
    count: 0,
    flag: false,
  });

  return (
    <div style={{ padding: 20 }}>
      <ChildHoc count={state.count} />
      <Button color="primary" onClick={() => state.count++}>
        count加1
      </Button>
      <Button
        style={{ marginLeft: 8 }}
        color="primary"
        onClick={() => (state.flag = !state.flag)}
      >
        切换状态：{JSON.stringify(state.flag)}
      </Button>
    </div>
  );
};

export default Index;
