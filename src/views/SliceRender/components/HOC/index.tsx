import React, { useEffect, useState } from "react";

let waitList: any = []; //等待队列

const HOC =
  (Component: any) =>
  ({ list, ...props }: any) => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
      if (list.length !== 0) {
        sliceTime(list, 0);
      }
    }, [list]);

    const sliceTime = (list: any[], times = 0, number: number = 100) => {
      console.log("list: ", list.length, times, number);

      if (times === Math.ceil(list.length / number) + 1) return; //判断条件
      setTimeout(() => {
        const newList: any = list.slice(times * number, (times + 1) * number);
        waitList = [...waitList, ...newList];
        setData(waitList);
        sliceTime(list, times + 1);
      }, 500);
    };

    if (list.length === 0) return <></>;

    return (
      <>
        {data.map((item: any) => (
          <Component id={item} {...props} key={item} />
        ))}
      </>
    );
  };

export default HOC;
