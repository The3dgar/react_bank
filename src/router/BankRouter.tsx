import React, { useContext } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Row, Col } from "antd";

import { DestinataryScreen } from "../screens/DestinataryScreen";
import { Navbar, HeaderOpt } from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { TransferScreen } from "../screens/TransferScreen";
import { HistoryScreens } from "../screens/HistoryScreens";

export const BankRouter = () => {
  const { user, logOut } = useContext(AuthContext);
  const history = useHistory();

  const headerOptions: HeaderOpt[] = [
    {
      name: "Nuevo Destinatario",
      onClick: () => history.push("/destinatario"),
    },
    {
      name: "Transferir",
      onClick: () => history.push("/transferir"),
    },
    {
      name: "Historial",
      onClick: () => history.push("/historial"),
    },
    {
      name: "Salir",
      onClick: () => setTimeout(logOut, 200),
    },
  ];

  return (
    <div
      style={{
        overflowY: "scroll",
        height: "100vh",
      }}
    >
      <Navbar title={`Hola ${user?.name} 👑`} headerOptions={headerOptions} />
      <Row justify="center" align="middle" className="layout_content">
        <Col>
          <Switch>
            <Route path="/destinatario" exact component={DestinataryScreen} />
            <Route path="/transferir" component={TransferScreen} />
            <Route path="/historial" component={HistoryScreens} />
            <Redirect to="/destinatario" />
          </Switch>
        </Col>
      </Row>
    </div>
  );
};
