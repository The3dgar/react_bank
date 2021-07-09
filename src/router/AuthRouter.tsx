import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Row, Col } from "antd";

import { LoginScreen } from "../screens/LoginScreen";
import { Navbar, HeaderOpt } from "../components/Navbar";
import { RecoveryScreen } from "../screens/RecoveryScreen";
import { RegisterScreen } from "../screens/RegisterScreen";

export const AuthRouter = () => {
  const headerOptions: HeaderOpt[] = [
    {
      name: "Nosotros",
    },
    {
      name: "Contacto",
    },
  ];

  return (
    <>
      <Navbar headerOptions={headerOptions} />
      <Row
        justify="center"
        align="middle"
        className="layout_content"
      >
        <Col>
          <Switch>
            <Route path="/" exact component={LoginScreen} />
            <Route path="/recuperar" component={RecoveryScreen} />
            <Route path="/registro" component={RegisterScreen} />
            <Redirect to="/" />
          </Switch>
        </Col>
      </Row>
    </>
  );
};
