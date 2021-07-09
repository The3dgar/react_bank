import { useEffect, useContext } from "react";
import { Card, Form, Input, Button, Row, Col, Select, Spin } from "antd";
import { validateRut } from "../utils/validateRut";
import { BankContext } from "../context/BankContext";
import { useHistory } from "react-router-dom";

interface formValues {
  _id: undefined,
  email: string;
  password: string;
  name: string;
  dni: string;
  phoneNumber: string;
  bankId: string;
  accountNumber: string;
  accountType: string;
}

export const DestinataryScreen = () => {
  const history = useHistory();

  const { accountTypes, loadBanks, banks, addDestinatary, loading } =
    useContext(BankContext);

  useEffect(() => {
    loadBanks();
  }, []);

  const handleSubmit = async (values: formValues) => {
    await addDestinatary(values);
    setTimeout(() => {
      history.push("/transferir");
    }, 500);
  };

  if (loading) return <Spin/>;

  return (
    <>
      <Card
        title="Nuevo Destinatario"
        style={{ textAlign: "center", border: "2px solid rgb(215, 223, 235)" }}
        hoverable
        bodyStyle={{
          paddingBottom: 0,
          height: "100%"
        }}
      >
        <Form
          {...layout}
          onFinish={handleSubmit}
          initialValues={{
            email: "",
            password: "",
            name: "",
            dni: "",
            phoneNumber: "",
            bankId: "",
            accountNumber: "",
            accountType: "",
          }}
          name="login"
        >
          <Row gutter={24}>
            <Col sm={12}>
              <Form.Item
                label="RUT"
                name="dni"
                rules={[
                  {
                    required: true,
                    type: "string",
                    message: "Por favor introduce un rut",
                    validator: (_, v) =>
                      validateRut(v) ? Promise.resolve() : Promise.reject(),
                  },
                ]}
              >
                <Input placeholder="12345678-k" />
              </Form.Item>
            </Col>
            <Col sm={12}>
              <Form.Item
                label="Nombre"
                name="name"
                rules={[
                  {
                    required: true,
                    type: "string",
                    message: "Por favor introduce un nombre",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col sm={12}>
              <Form.Item
                label="Correo"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Por favor introduce un email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col sm={12}>
              <Form.Item
                label="Teléfono"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    type: "string",
                    message: "Por favor introduce un celular",
                    min: 12,
                  },
                ]}
              >
                <Input placeholder="+56912345678" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col sm={12}>
              <Form.Item
                name="bankId"
                label="Banco"
                rules={[{ required: true, message: "Banco no válido" }]}
              >
                <Select
                  placeholder="Banco Wipley"
                  notFoundContent="Sin datos"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA?.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {banks.map((c, i) => (
                    <Select.Option value={c._id} key={i}>
                      {c.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={12}>
              <Form.Item
                name="accountType"
                label="Tipo de cuenta"
                rules={[{ required: true, message: "Tipo no válido" }]}
              >
                <Select
                  placeholder="Tipo de cuenta"
                  notFoundContent="Sin datos"
                >
                  {accountTypes.map((c, i) => (
                    <Select.Option value={c} key={i}>
                      {c}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col sm={12}>
              <Form.Item
                label="N° de cuenta"
                name="accountNumber"
                rules={[
                  {
                    required: true,
                    type: "string",
                    message: "Por favor introduce una cuenta",
                    min: 5,
                  },
                ]}
              >
                <Input placeholder="00001" />
              </Form.Item>
            </Col>
          </Row>

          {/* Botones */}
          <Form.Item {...tailLayout}>
            <Button
              block
              type="primary"
              htmlType="submit"
              style={{ fontWeight: "bold" }}
            >
              Crear Destinatario
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    // offset: 4,
    span: 24,
  },
};
