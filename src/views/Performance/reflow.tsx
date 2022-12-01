import { Card, List } from "antd";
import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import "./anmition.less";
const data = [
  {
    title: "title1",
  },
  {
    title: "title2",
  },
  {
    title: "title3",
  },
  {
    title: "title4",
  },
];

const Reflow: React.FC = () => {
  const cardRef: any = useRef();

  useEffect(() => {
    console.log("cardRef: ", cardRef.current);

    return () => {};
  }, []);
  let width = 100;
  const update = () => {
    const card1: HTMLDivElement | null = document.querySelector(".title1");
    if (card1) {
      card1.style.width = `${++width}px`;
    }
    if (width <= 150) {
      window.requestAnimationFrame(update);
    }
  };
  // window.requestAnimationFrame(update);
  return (
    <div>
      {data.map((item) => (
        <Card
          key={item.title}
          className="animation-testÍÍ"
          style={{ width: "25%", display: "inline-block" }}
          ref={cardRef}
          title={item.title}
        >
          Card content {item.title}
        </Card>
      ))}
    </div>
  );
};

export default observer(Reflow);
