import { useEffect, useRef } from "react";
import useReactive from "@/hooks/useReactive";
import useEventListener from "@/hooks/useEventListener";
import useCreation from "@/hooks/useCreation";
import React from "react";

const HOC =
  (Component: any) =>
  ({ list, ...props }: any) => {
    const state = useReactive({
      data: [], //渲染的数据
      scrollAllHeight: "100vh", // 容器的初始高度
      listHeight: 0, //列表高度
      itemHeight: 0, // 子组件的高度
      renderCount: 0, // 需要渲染的数量
      bufferCount: 4, // 缓冲的个数
      start: 0, // 起始索引
      end: 0, // 终止索引
      currentOffset: 0, // 偏移量
    });

    const allRef = useRef<any>(null); // 容器的ref
    const scrollRef = useRef<any>(null); // 检测滚动

    useEffect(() => {
      // 子列表高度
      const ItemHeight = 65;

      // 容器的高度
      const scrollAllHeight = allRef.current.offsetHeight;

      // 列表高度
      const listHeight = ItemHeight * list.length;

      //渲染节点的数量
      const renderCount =
        Math.ceil(scrollAllHeight / ItemHeight) + state.bufferCount;

      state.renderCount = renderCount;
      state.end = renderCount + 1;
      state.listHeight = listHeight;
      state.itemHeight = ItemHeight;
      state.data = list.slice(state.start, state.end);
    }, [allRef]);

    useCreation(() => {
      state.data = list.slice(state.start, state.end);
    }, [state.start]);

    useEventListener(
      "scroll",
      () => {
        // 顶部高度
        const { scrollTop } = scrollRef.current;
        state.start = Math.floor(scrollTop / state.itemHeight);
        state.end = Math.floor(
          scrollTop / state.itemHeight + state.renderCount + 1
        );
        state.currentOffset = scrollTop - (scrollTop % state.itemHeight);
        // state.data = list.slice(state.start, state.end)
      },
      scrollRef
    );

    return (
      <div ref={allRef} className="wrapper">
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
              <div key={item}>
                {/* 子组件 */}
                <Component id={item} {...props} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default HOC;
