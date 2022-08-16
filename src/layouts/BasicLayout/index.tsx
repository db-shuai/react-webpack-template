import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import React from "react";
import "./index.less";
import Sider from "../Sider";
import Header from "../Header";

const { Content } = Layout;

const BasicLayout: React.FC = () => {
  return (
    <Layout className="basic-layout-wrapper">
      <Sider />
      <Layout className="site-layout">
        <Header />
        <Content
          className="site-layout-background"
          style={{
            margin: "12px 10px",
            padding: 12,
            minHeight: 280,
            height: "100%",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
