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
import BlankLayout from "@/layouts/BlankLayout";

export const contentRoutes = [
  {
    path: "dashboard",
    name: "首页",
    icon: <HomeOutlined />,
    component: lazy(() => import("@/views/Dashboard")),
  },
  {
    path: "json-editor",
    name: "JSON编辑器",
    icon: <SmileOutlined />,
    component: lazy(() => import("@/views/JsonEditor")),
  },
  {
    path: "slice-render",
    name: "分片渲染",
    icon: <SmileOutlined />,
    component: lazy(() => import("@/views/SliceRender")),
  },
  {
    path: "virtual-scroll",
    name: "虚拟滚动",
    icon: <SmileOutlined />,
    component: BlankLayout,
    children: [
      {
        path: "fixed-height",
        name: "固定高度",
        component: lazy(() => import("@/views/VirtualScroll")),
      },
      {
        path: "auto-height",
        name: "自适应高度",
        component: lazy(() => import("@/views/VirtualScrollPro")),
      },
    ],
  },
  {
    path: "performance",
    name: "性能",
    icon: <SmileOutlined />,
    component: BlankLayout,
    children: [
      {
        path: "api",
        name: "性能测量API",
        component: lazy(() => import("@/views/Performance")),
      },
      {
        path: "reflow",
        name: "reflow检测",
        component: lazy(() => import("@/views/Performance/reflow")),
      },
    ],
  },
  {
    path: "animation",
    name: "动画",
    icon: <SmileOutlined />,
    component: BlankLayout,
    children: [
      {
        path: "rotate",
        name: "旋转",
        component: lazy(() => import("@/views/Animation/rotate")),
      },
    ],
  },
  {
    path: "fun-test",
    name: "测试",
    icon: <SmileOutlined />,
    component: BlankLayout,
    children: [
      {
        path: "async-com",
        name: "测试啊",
        component: lazy(() => import("@/views/FunTest")),
      },
    ],
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
