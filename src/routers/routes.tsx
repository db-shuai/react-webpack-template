import React, { lazy } from "react";
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  FormOutlined,
  UserOutlined,
  StarOutlined,
  WarningOutlined,
  FrownOutlined,
} from "@ant-design/icons";

import BasicLayout from "@/layouts/BasicLayout";
// import BlankLayout from "@/layouts/BlankLayout";

export const contentRoutes = [
  {
    path: "/dashboard",
    name: "首页",
    icon: <SmileOutlined />,
    component: lazy(() => import("@/views/Dashboard")),
  },
  {
    path: "/json-editor",
    name: "JSON编辑器",
    icon: <SmileOutlined />,
    component: lazy(() => import("@/views/JsonEditor")),
  },
  {
    path: "/virtual-scroll",
    name: "虚拟滚动",
    icon: <SmileOutlined />,
    component: lazy(() => import("@/views/VirtualScroll")),
  },
  /* {
    path: '/welcome',
    name: '欢迎页',
    icon: <SmileOutlined />,
    component: lazy(() => import('@/views/Welcome')),
  }, */
  /* {
    path: '/home',
    name: 'home主页',
    icon: <HomeOutlined />,
    component: lazy(() => import('@/views/Home')),
  },
  {
    path: '/formDemo',
    name: '表单演示',
    icon: <FormOutlined />,
    component: lazy(() => import('@/views/FormDemo')),
  },
  {
    path: '/system',
    name: '系统管理',
    icon: <SettingFilled />,
    children: [
      {
        path: '/system/groovySet',
        name: 'Groovy脚本管理',
        component: lazy(() => import('@/views/System/GroovySet')),
      },
      {
        path: '/system/user',
        name: '用户配置',
        icon: <UserOutlined />,
        component: lazy(() => import('@/views/System/User')),
      },
      {
        path: '/system/star',
        name: '个人中心',
        icon: <StarOutlined />,
        component: lazy(() => import('@/views/System/Star')),
      },
    ],
  }, */
  /*           {
    path: '/exception',
    name: '异常页',
    // exact: true,
    icon: <WarningOutlined />,
    children: [
      {
        path: '/exception/403',
        name: '403',
        icon: <FrownOutlined />,
        component: lazy(() => import('@/views/Exception/403')),
      },
      {
        path: '/exception/404',
        name: '404',
        exact: true,
        icon: <FrownOutlined />,
        component: lazy(() => import('@/views/Exception/404')),
      },
      {
        path: '/exception/500',
        name: '500',
        icon: <FrownOutlined />,
        component: lazy(() => import('@/views/Exception/500')),
      },
    ],
  }, */
];
const routes = [
  // 子菜单路由
  {
    path: "login", // 路由路径
    name: "登录页", // 菜单名称 (不设置,则不展示在菜单栏中）
    component: lazy(() => import("@/views/Login")), // 懒加载 路由组件
    hidden: true,
  },
  {
    path: "/",
    // exact: true,
    component: BasicLayout, // 基本布局
    children: [
      ...contentRoutes,
      { path: "/", redirect: "/dashboard" },
      { path: "*", redirect: "/exception/404" },
    ],
  },
];

export default routes;
