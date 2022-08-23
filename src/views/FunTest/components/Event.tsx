import { Button, notification } from "antd";
import React from "react";
import HOC from "@/components/EventEnablementHOC";

// 子组件
const Child = () => {
  return (
    <div>
      <Button id="test-button">赋能按钮</Button>
    </div>
  );
};

const Child1 = () => {
  return (
    <div
      id="id"
      style={{ marginTop: 10, background: "gold", cursor: "pointer" }}
    >
      赋能id
    </div>
  );
};

const Child2 = () => {
  return (
    <div
      className="class"
      style={{ marginTop: 10, background: "violet", cursor: "pointer" }}
    >
      赋能class
    </div>
  );
};

const CHildHoc = HOC({
  target: "#test-button",
  handler: () => {
    notification.open({
      message: "按钮赋能",
    });
  },
})(Child);

const CHildHoc1 = HOC({
  target: "#id",
  handler: () => {
    notification.open({
      message: "id赋能",
    });
  },
})(Child1);

const CHildHoc2 = HOC({
  target: ".class",
  handler: () => {
    notification.open({
      message: "class赋能",
    });
  },
})(Child2);

const Index: React.FC<any> = (props) => {
  return (
    <div style={{ padding: 20 }}>
      <CHildHoc />
      <CHildHoc1 />
      <CHildHoc2 />
    </div>
  );
};

export default Index;
