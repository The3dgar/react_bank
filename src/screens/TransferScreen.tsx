import { useEffect, useContext, useState } from "react";
import { Card, Form, Input, Button, Row, Col, Select, Spin } from "antd";
import { BankContext } from "../context/BankContext";
import { useHistory } from "react-router-dom";
import { Destinatary } from "../interfaces/bankInterfaces";
import { DestinataryInfo } from "../components/DestinataryInfo";

interface formValues {
  destinataryId: string;
  amount: number;
}

const initialState = {
  _id: "",
  dni: "",
  name: "",
  email: "",
  phoneNumber: "",
  bankId: {
    _id: "",
    name: "",
  },
  accountType: "",
  accountNumber: "",
  userId: "",
  createdAt: "",
  updatedAt: "",
};

export const TransferScreen = () => {
  const history = useHistory();

  const [destinatary, setDestinatary] = useState<Destinatary>(initialState);

  const {
    loadDestinataries,
    destinataries,
    addMovement,
    loadDestinataryById
  } = useContext(BankContext);

  useEffect(() => {
    loadDestinataries();
  }, []);

  const loadDestinatary = async (id: string) => {
    if (!id) return;
    const {
      destinataries: [data],
    } = await loadDestinataryById(id);
    setDestinatary(data);
  };

  const handleSubmit = async (values: formValues) => {
    await addMovement(values);
    setTimeout(() => {
      history.push("/historial");
    }, 500);
  };

  return (
    <>
      <Card
        title="Nueva transferencia"
        style={{ textAlign: "center", border: "2px solid rgb(215, 223, 235)" }}
        hoverable
        bodyStyle={{
          paddingBottom: 0,
        }}
      >
        <Form
          {...layout}
          onFinish={handleSubmit}
          initialValues={{
            amount: "",
            destinataryId: "",
          }}
          name="login"
        >
          <Row gutter={24}>
            <Col sm={24}>
              <Form.Item
                name="destinataryId"
                label="Destinatario"
                rules={[{ required: true, message: "Destinatario no válido" }]}
              >
                <Select
                  placeholder="Destinatario"
                  notFoundContent="Sin datos"
                  onChange={loadDestinatary}
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
                  {destinataries.map((d, i) => (
                    <Select.Option value={d._id || i} key={i}>
                      {d.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            {destinatary._id && <DestinataryInfo {...destinatary} />}
          </Row>
          <Row gutter={24}>
            <Col sm={24}>
              <Form.Item
                label="Monto"
                name="amount"
                rules={[
                  {
                    required: true,
                    type: "string",
                    message: "Por favor introduce un monto",
                  },
                ]}
              >
                <Input type="number" min="0" />
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
              Transferir
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
