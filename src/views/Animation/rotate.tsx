import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Row, Col, Card } from "antd";
import "./rotate.less";
// @ts-ignore
import less from 'less'
const RotatePage: React.FC = () => {
  useEffect(() => {
    // @ts-ignore
    less.modifyVars({ "count": 7 });
    // @ts-ignore
    less.refreshStyles();
  });
  return (
    <div className="animation-wrapper">
      <Row gutter={16}>
        <Col
          span={24}
          style={{ marginBottom: "10px", height: "calc(100vh - 48px)" }}
        >
          <Card title="旋转" bordered={false}>
            {/* <div style={{margin:"0 auto"}}> */}
            <div id="lopp"></div>
            <div className="ball ball1">1</div>
            <div className="ball ball2">2</div>
            <div className="ball ball3">3</div>
            <div className="ball ball4">4</div>
            <div className="ball ball5">5</div>
            <div className="ball ball6">6</div>
            <div className="ball ball7">7</div>
            <div className="ball ball8">8</div>
            {/* </div> */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default observer(RotatePage);
