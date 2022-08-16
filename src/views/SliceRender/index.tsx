import React, { useEffect, useState } from "react";
import img from "./img.png";
import SlicingHoc from "./components/HOC";

const Item: React.FC<{ id: number }> = ({ id }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center ",
        marginBottom: "5px",
      }}
    >
      <img src={img} width={80} height={60} alt="" />
      列表{id}
    </div>
  );
};

const ItemHoc = SlicingHoc(Item);

const Index: React.FC = (props) => {
  const [list, setList] = useState<Array<number>>([]);

  useEffect(() => {
    let arr: number[] = [];
    for (let i = 0; i < 1010; i++) {
      arr.push(i);
    }
    setList(arr);
  }, []);

  return (
    <div>
      <ItemHoc list={list} />
    </div>
  );
};

export default Index;
