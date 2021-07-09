import React, { useState, useContext } from "react";
import { Card, Form, Input, Button, Spin } from "antd";
import { useHistory } from "react-router-dom"; //enrutador
import { AuthContext } from "../context/AuthContext";
import { useError } from "../hooks/useError";
import { validateRut } from "../utils/validateRut";

interface formValues {
  name: string;
  dni: string;
  email: string;
  password: string;
}

export const RegisterScreen = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { signUp } = useContext(AuthContext);
  useError();

  const handleSubmit = (values: formValues) => {
    signUp(values);
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
      title="Nuevo Usuario"
      style={{ textAlign: "center", border: "2px solid rgb(215, 223, 235)" }}
      hoverable
      bodyStyle={{
        paddingBottom: 0,
      }}
    >
      <Form
        {...layout}
        onFinish={handleSubmit}
        initialValues={{ email: "", password: "", name: "", dni: "" }}
        name="register"
      >
        <Form.Item
          label="Nombre"
          name="name"
          rules={[
            {
              required: true,
              type: "string",
              message: "Por favor introduce tu nombre",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="RUT"
          name="dni"
          rules={[
            {
              required: true,
              type: "string",
              message: "Por favor introduce tu rut",
              validator: (_, v) =>
                validateRut(v) ? Promise.resolve() : Promise.reject(),
            },
          ]}
        >
          <Input placeholder="12345678-k" />
        </Form.Item>
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
            Crear cuenta
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
