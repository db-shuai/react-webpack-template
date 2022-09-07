import React, { useEffect, useRef } from "react";
import useReactive from "@/hooks/useReactive";
import useEventListener from "@/hooks/useEventListener";
import useCreation from "@/hooks/useCreation";

const HOC =
  (Component: any) =>
  ({ list, onRequest, ...props }: any) => {
    const state = useReactive<any>({
      data: [], //渲染的数据
      scrollAllHeight: "100%", // 容器的初始高度
      listHeight: 0, //列表高度
      itemHeight: 0, // 子组件的高度
      renderCount: 0, // 需要渲染的数量
      bufferCount: 4, // 缓冲的个数
      start: 0, // 起始索引
      end: 0, // 终止索引
      currentOffset: 0, // 偏移量
      positions: [
        //需要记录每一项的高度
        // index         // 当前pos对应的元素的下标
        // top;          // 顶部位置
        // bottom        // 底部位置
        // height        // 元素高度
        // dHeight        // 用于判断是否需要改变
      ],
      initItemHeight: 36, // 预计高度
    });

    const allRef = useRef<any>(null); // 容器的ref
    const scrollRef = useRef<any>(null); // 检测滚动
    const ref = useRef<any>(null); // 检测滚动

    useEffect(() => {
      console.log("useEffect: initPositions");
      // 初始高度
      initPositions();
    }, []);

    const initPositions = () => {
      const data = [];
      for (let i = 0; i < list.length; i++) {
        data.push({
          index: i,
          height: state.initItemHeight,
          top: i * state.initItemHeight + 60,
          bottom: (i + 1) * state.initItemHeight + 60,
          dHeight: 0,
        });
      }
      state.positions = [...data];
    };

    useEffect(() => {
      console.log("useEffect: ItemHeight");
      // 子列表高度：为默认的预计高度
      const ItemHeight = state.initItemHeight;

      // 容器的高度
      const scrollAllHeight = allRef.current.offsetHeight;

      // 列表高度：positions最后一项的bottom
      const listHeight = state.positions[state.positions.length - 1].bottom;

      //渲染节点的数量
      const renderCount = Math.ceil(scrollAllHeight / ItemHeight);

      state.renderCount = renderCount;
      state.end = renderCount + 1;
      state.listHeight = listHeight;
      state.itemHeight = ItemHeight;
      state.data = list.slice(state.start, state.end);
    }, [allRef, list.length]);

    useEffect(() => {
      // console.log("useEffect: setPostition");
      setPostition();
    }, [ref.current]);

    const setPostition = () => {
      const nodes = ref.current.childNodes;
      // console.log("nodes: ", nodes);
      if (nodes.length === 0) return;
      nodes.forEach((node: HTMLDivElement) => {
        if (!node) return;
        const rect = node.getBoundingClientRect(); // 获取对应的元素信息
        console.log("rect: ", rect);
        const index = +node.id; // 可以通过id，来取到对应的索引
        const oldHeight = state.positions[index].height; // 旧的高度
        const dHeight = oldHeight - rect.height; // 差值
        console.log("dHeight: ", dHeight);
        if (dHeight) {
          state.positions[index].height = rect.height; //真实高度

          state.positions[index].bottom =
            state.positions[index].bottom - dHeight;

          console.log(
            "state.positions[index].bottom: ",
            state.positions[index].bottom
          );

          state.positions[index].dHeight = dHeight; //将差值保留
        }
      });

      //  重新计算整体的高度
      const startId = +nodes[0].id;
      // console.log("startId: ", startId);

      const positionLength = state.positions.length;
      let startHeight = state.positions[startId].dHeight;
      // console.log("startHeight: ", startHeight);
      state.positions[startId].dHeight = 0;

      for (let i = startId + 1; i < positionLength; ++i) {
        // console.log("state.positions[i].bottom: ", state.positions[i].bottom);
        // console.log("startHeight: ", startHeight);
        const item = state.positions[i];
        state.positions[i].top = state.positions[i - 1].bottom;
        state.positions[i].bottom = state.positions[i].bottom - startHeight;
        if (item.dHeight !== 0) {
          startHeight += item.dHeight;
          item.dHeight = 0;
        }
      }

      // 重新计算列表的高度
      state.listHeight = state.positions[positionLength - 1].bottom;
    };

    useCreation(() => {
      state.data = list.slice(state.start, state.end);

      if (ref.current) {
        setPostition();
      }
    }, [state.end]);

    useEventListener(
      "scroll",
      () => {
        // 顶部高度
        const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
        state.start = binarySearch(state.positions, scrollTop);
        state.end = state.start + state.renderCount + 1;

        // 计算偏移量
        state.currentOffset =
          state.start > 0 ? state.positions[state.start - 1].bottom : 0;

        // 滚动条距离的高度
        /* const button = scrollHeight - clientHeight - scrollTop;
        if (button === 0 && onRequest) {
          onRequest();
        } */
      },
      scrollRef
    );

    // 二分查找
    const binarySearch = (list: any[], value: any) => {
      let start: number = 0;
      let end: number = list.length - 1;
      let tempIndex = null;
      while (start <= end) {
        let midIndex = parseInt(String((start + end) / 2));
        let midValue = list[midIndex].bottom;
        if (midValue === value) {
          return midIndex + 1;
        } else if (midValue < value) {
          start = midIndex + 1;
        } else if (midValue > value) {
          if (tempIndex === null || tempIndex > midIndex) {
            tempIndex = midIndex;
          }
          end = end - 1;
        }
      }
      return tempIndex;
    };

    return (
      <div ref={allRef} className="wrapper" style={{ height: "100%" }}>
        <div
          style={{
            height: state.scrollAllHeight,
            overflow: "scroll",
            position: "relative",
          }}
          ref={scrollRef}
        >
          {/* 占位，列表的总高度，用于生成滚动条 */}
          <div
            style={{
              height: state.listHeight,
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
            }}
          ></div>
          {/* 内容区域 */}
          <div
            ref={ref}
            style={{
              transform: `translate3d(0, ${state.currentOffset}px, 0)`,
              position: "relative",
              left: 0,
              top: 0,
              right: 0,
            }}
          >
            {/* 渲染区域 */}
            {state.data.map((item: any) => (
              <div id={String(item.id)} key={item.id}>
                {/* 子组件 */}
                <Component id={item.content} {...props} index={item.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default HOC;
