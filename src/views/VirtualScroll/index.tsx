import React, { useEffect, useState } from "react";
import img from "./img.png";
import HOC from "./components/HOC";

// 子组件
const Item: React.FC<{ id: any }> = ({ id }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: 5 }}>
      <img src={img} width={80} height={60} alt="" />
      列表{id}
    </div>
  );
};

const ItemHoc = HOC(Item);

const Index: React.FC<any> = (props) => {
  const [list, setList] = useState<Array<number>>([]);

  useEffect(() => {
    let arr: number[] = [];
    for (let i = 0; i < 500; i++) {
      arr.push(i);
    }
    setList(arr);
  }, []);

  if (list.length === 0) return <></>;

  return (
    <div>
      <ItemHoc list={list} />
    </div>
  );
};

export default Index;
