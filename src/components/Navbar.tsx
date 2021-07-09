import React from "react";
import { PageHeader, Button } from "antd";

interface Props {
  title?: string;
  headerOptions?: HeaderOpt[];
}

export interface HeaderOpt {
  name: string;
  onClick?: () => void;
}

export const Navbar = ({ title, headerOptions }: Props) => {
  return (
    <PageHeader
      title={`BANCO Wipley ${title ? `- ${title}` : ""}`}
      style={{
        borderBottom: "3px solid rgb(215, 223, 235)",
      }}
      extra={headerOptions?.map((h, i) => (
        <Button key={i} type="text" size="small" onClick={h.onClick}>
          {h.name}
        </Button>
      ))}
    />
  );
};
