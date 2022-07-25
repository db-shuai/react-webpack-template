import React from "react";
import { Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./index.less";
import { observer } from "mobx-react";
import { appStores } from "@/stores";

const Header = () => {
  const { global } = appStores();
  const { Header } = Layout;

  return (
    <Header className="header-component site-layout-background" style={{ padding: 0 }}>
      {React.createElement(
        global.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "trigger",
          onClick: () => global.toggleCollapsed(!global.collapsed),
        }
      )}
    </Header>
  );
};

export default observer(Header);