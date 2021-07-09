import { useEffect, useContext } from "react";
import { Card, Table, Spin } from "antd";
import { BankContext } from "../context/BankContext";
import { Destinatary } from "../interfaces/bankInterfaces";

const columns = [
  {
    title: "Destinatario",
    dataIndex: "destinataryId",
    key: "destinataryId",
    render: (destinataryId: Destinatary) => destinataryId.name,
  },
  {
    title: "RUT",
    dataIndex: "destinataryId",
    key: "destinataryId",
    render: (destinataryId: Destinatary) => destinataryId.dni,
  },
  {
    title: "Banco",
    dataIndex: "destinataryId",
    key: "destinataryId",
    render: (destinataryId: Destinatary) => {
      const bankName: any = destinataryId.bankId;
      return bankName?.name;
    },
  },
  {
    title: "Tipo de cuenta",
    dataIndex: "destinataryId",
    key: "destinataryId",
    render: (destinataryId: Destinatary) =>
      `Cuenta ${destinataryId.accountType}`,
  },
  {
    title: "N° cuenta",
    dataIndex: "destinataryId",
    key: "destinataryId",
    render: (destinataryId: Destinatary) => destinataryId.accountNumber,
  },
  {
    title: "Monto $",
    dataIndex: "amount",
    key: "amount",
    render: (amount: any) => new Intl.NumberFormat("de-DE").format(amount),
  },
];

export const HistoryScreens = () => {
  const { loadMovements, movements, loading } = useContext(BankContext);

  useEffect(() => {
    loadMovements();
  }, []);

  if (loading) return <Spin />;

  return (
    <>
      <Card
        title="Historial "
        style={{ textAlign: "center", border: "2px solid rgb(215, 223, 235)" }}
        hoverable
        bodyStyle={{
          paddingBottom: 0,
        }}
      >
        <div style={{ marginTop: 10 }}>
          <Table
            bordered
            dataSource={movements}
            columns={columns}
            loading={loading}
            size="small"
            scroll={{ x: true }}
          />
        </div>
      </Card>
    </>
  );
};
