import React from "react";
import { Layout, Menu, MenuProps } from "antd";
import { observer } from "mobx-react";
import { appStores } from "@/stores";
import { contentRoutes } from "@/routers/routes";
import "./index.less";
import { Link, useNavigate } from "react-router-dom";

const menusMap = (routes: any) => {
  return routes
    .filter((route: any) => {
      return !route.hidden;
    })
    .map((route: any) => {
      const res: any = {};
      if (route.children) {
        res.children = menusMap(route.children);
      }
      return {
        ...res,
        label: route.name,
        icon: route.icon,
        key: route.path,
        title: route.name,
      };
    });
};
const Sider = () => {
  const { Sider } = Layout;
  const { global } = appStores();
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
    
    navigate(e.keyPath.reverse().join('/'));
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={global.collapsed}
      className="sider-component"
    >
      <div className="logo" />
      <Menu
        onClick={onClick}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/dashboard"]}
        items={menusMap(contentRoutes)}
      />
    </Sider>
  );
};

export default observer(Sider);
