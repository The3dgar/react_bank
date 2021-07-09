import React, { useState, useContext } from "react";
import { Card, Form, Input, Button, Spin } from "antd";
import { useHistory } from "react-router-dom"; //enrutador
import { AuthContext } from "../context/AuthContext";
import { useError } from "../hooks/useError";

interface formValues {
  email: string;
  password: string;
}

export const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { signIn } = useContext(AuthContext);
  useError();

  const handleSubmit = (values: formValues) => {
    signIn(values);
  };

  const handleRecovery = () => {
    setLoading(true);
    setTimeout(() => {
      history.push("/recuperar");
    }, 500);
  };

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      history.push("/registro");
    }, 500);
  };

  if (loading) return <Spin />;
  return (
    <Card
      title="Inicio de sesión"
      style={{ textAlign: "center", border: "2px solid rgb(215, 223, 235)" }}
      hoverable
      bodyStyle={{
        paddingBottom: 0,
      }}
    >
      <Form
        {...layout}
        onFinish={handleSubmit}
        initialValues={{ email: "", password: "" }}
        name="login"
      >
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
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor introduce tu contraseña",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ fontWeight: "bold" }}
          >
            Entrar
          </Button>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button type="link" onClick={handleRegister} style={{ padding: 0 }}>
              Registrarse
            </Button>
            <Button type="text" onClick={handleRecovery} style={{ padding: 0 }}>
              Recuperar contraseña
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    // offset: 4,
    span: 24,
  },
};
