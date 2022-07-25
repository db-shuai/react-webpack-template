import { Button, Checkbox, Form, Input } from "antd";
import { observer } from "mobx-react";
import React from "react";
import "./style.less";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    navigate("/dashboard");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-wrapper">
      <Form
        className="login-form"
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 6, span: 18 }}
        >
          <Checkbox>记住密码</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button block type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default observer(LoginPage);
