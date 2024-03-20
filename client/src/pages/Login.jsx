import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input, notification } from "antd";

import logo from "../Img/laoji.jpeg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [form] = Form.useForm();

  const handleLoginFailedNotification = (description) => {
    notification.error({
      message: "User Login Failed",
      description,
      placement: "topLeft",
    });
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  async function login() {
    const user = {
      email,
      password,
    };
    try {
      const { data, status } = await axios.post("/api/users/login", user);

      if (status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(data));
        window.location.href = "/records-view";
      } else {
        handleLoginFailedNotification("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        handleLoginFailedNotification("User not found.");
      } else if (error.response && error.response.status === 400) {
        handleLoginFailedNotification("Incorrect password.");
      } else {
        handleLoginFailedNotification("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="login">
      <div style={{ maxWidth: 400, margin: "auto" }}>
        <div style={{ display: "flex", justifyContent: "Center" }}>
          {" "}
          <img
            src={logo}
            alt="Logo"
            style={{ width: "200px", marginBottom: "20px" }}
          />{" "}
        </div>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label={
              <span style={{ fontWeight: "bold", color: "gold" }}>Email</span>
            }
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ fontWeight: "bold", color: "gold" }}>
                Password
              </span>
            }
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            className="sign-up-btn-col"
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "gold",
                borderColor: "gold",
                color: "red",
              }}
              onClick={login}
              className="login-btn"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
