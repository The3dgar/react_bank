import React from "react";
import { Typography } from "antd";
import { Destinatary } from "../interfaces/bankInterfaces";
const { Text, Title } = Typography;

export const DestinataryInfo = (props: Destinatary) => {
  const { name, email, bankId, accountType, accountNumber } = props;
  const bankData: any = bankId
  return (
    <div style={{marginLeft: 10 , textAlign: "left", paddingBottom: 15}}>
      <Title level={5} style={{marginLeft: 0}}>Detalle del destinatario</Title>
      <Text>{name}</Text>
      <br/>
      <Text>{email}</Text>
      <br/>
      <Text>{bankData?.name}</Text>
      <br/>
      <Text>Cuenta {accountType}</Text>
      <br/>
      <Text>N° {accountNumber}</Text>
    </div>
  );
};
