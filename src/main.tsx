import React from "react";
import ReactDom from "react-dom/client";
import { ConfigProvider } from "antd";
// import "antd/dist/antd.css";
import zhCN from "antd/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "./styles/main.less";
import AppRouter from "./routers";

dayjs.locale("zh-cn");

const App = () => (
  <ConfigProvider locale={zhCN}>
    <AppRouter />
  </ConfigProvider>
);

const root = ReactDom.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);

/* // 热更新
if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
      console.error('module.hot，', err);
    }
  });
} */
