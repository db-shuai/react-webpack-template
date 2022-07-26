import React from "react";
import { Card, Col, Row } from "antd";
import AsyncComTest from "./components/AsyncCom";
import PerformanceTest from "./components/Performance";
import EventTest from "./components/Event";
import UseCallBackTest from "./components/useCallBackTest";
import UseMemoTest from "./components/useMemoTest";
import UseCreationTest from "./components/useCreationTest";
import UseReactiveTest from "./components/useReactiveTest";

const Index: React.FC = () => (
  <div className="site-card-wrapper">
    <Row gutter={10}>
      <Col span={8}>
        <Card title="异步组件" bordered={false}>
          <AsyncComTest />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="性能优化" bordered={false}>
          <PerformanceTest />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="事件赋能" bordered={false}>
          <EventTest />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="useMemo" bordered={false}>
          <UseMemoTest />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="useCallback" bordered={false}>
          <UseCallBackTest />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="useCreation" bordered={false}>
          <UseCreationTest />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="useReactive" bordered={false}>
          <UseReactiveTest />
        </Card>
      </Col>
    </Row>
  </div>
);

export default Index;
