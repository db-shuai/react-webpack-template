import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { appStores } from "@/stores";
import { Dropdown, Menu, Space, Button } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.less";

const RightContent = () => {
  const { user } = appStores();
  const navigate = useNavigate();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "logout":
        user.logout("111");
        navigate("/login");
        break;

      default:
        break;
    }
  };

  const menus = [
    {
      label: "退出登录",
      key: "logout",
      icon: <UserOutlined />,
    },
  ];

  return (
    <div className="right-content">
      <Dropdown menu={{ onClick: handleMenuClick, items: menus }}>
        <Space>
          <Button type="text">{user.username}</Button>
        </Space>
      </Dropdown>
    </div>
  );
};

export default observer(RightContent);
