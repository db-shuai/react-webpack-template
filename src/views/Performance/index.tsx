import React, { useEffect } from "react";
import { observer } from "mobx-react";

const PerformanceApiPage: React.FC = () => {
  useEffect(() => {
    // window.addEventListener("load", () => {
    //   let performances: any =
    //     performance.getEntriesByType("navigation");
    //   console.log("performances: ", performances);
    //   let tti = performances[0]?.domInteractive - performances[0]?.fetchStart;
    //   console.log('tti: ', tti);
    // });
    
    // let observer = new PerformanceObserver((list: any) => {
    //   for (const entry of list.getEntries) {
    //     console.log("entry: ", entry);
    //   }
    // });

    // observer.observe({ entryTypes: ["longtask"] });
    return () => {};
  }, []);
  return <div>dashboard</div>;
};

export default observer(PerformanceApiPage);
