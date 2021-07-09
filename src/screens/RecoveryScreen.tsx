import React, { useState } from "react";
import { Card, Form, Input, Button, Spin, Modal } from "antd";
import { useHistory } from "react-router-dom";
import bankApi from "../api/bankApi";

export const RecoveryScreen = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (value: any) => {
    setLoading(true);
    bankApi.post("/auth/recovery", value);
    Modal.success({
      title: "Exito!",
      content:
        "Si la cuenta existe, se le enviaran instrucciones al correo electrónico",
      onOk() {
        handleReturn();
      },
    });
  };

  const handleReturn = () => {
    setLoading(true);
    setTimeout(() => {
      history.push("/login");
    }, 100);
  };

  if (loading) return <Spin />;
  return (
    <Card
      title="Recuperar contraseña"
      style={{ textAlign: "center", border: "2px solid rgb(215, 223, 235)" }}
      hoverable
      bodyStyle={{
        paddingBottom: 0,
      }}
    >
      <Form {...layout} onFinish={handleSubmit} name="recovery">
        <Form.Item
          label="Correo"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Por favor introduce tu email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button block type="primary" htmlType="submit">
            Recuperar
          </Button>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button type="link" onClick={handleReturn} style={{ padding: 0 }}>
              ¿Ya tienes una cuenta?
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
};
const tailLayout = {
  wrapperCol: {
    span: 24,
  },
};
