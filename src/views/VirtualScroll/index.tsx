import { Button } from "antd";
import React, { useEffect, useState } from "react";
import img from "./img.png";
import SlicingHoc from "./components/HOC";

const Item: React.FC<{ id: number; waitRender: (val?: any) => void }> = ({
  id,
  waitRender,
}) => {
  useEffect(() => {
    waitRender();
  }, []);

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
  const [flag, setFlag] = useState<boolean>(false);
  const [list, setList] = useState<Array<number>>([]);

  useEffect(() => {
    let arr: number[] = [];
    for (let i = 0; i < 10; i++) {
      arr.push(i);
    }
    setList(arr);
  }, []);

  return (
    <div>
      {/* <Button
        onClick={async () => {
          setFlag(true);
          let arr: number[] = [];
          console.time();
          for (let i = 0; i < 5000; i++) {
            arr.push(i);
          }
          await setList(arr);
          console.timeEnd();
        }}
      >
        渲染
      </Button> */}
      {list.map((item) => (
        <ItemHoc id={item} key={item} />
      ))}
    </div>
  );
};

export default Index;
