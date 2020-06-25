import React from "react";
import { Spin } from "antd";
import { WarningTwoTone } from "@ant-design/icons";

const ErrorPopup = ({ children, error, message }) => {
  return (
    <Spin
      tip={message}
      indicator={<WarningTwoTone style={{ fontSize: 24 }} />}
      spinning={error}
    >
      {children}
    </Spin>
  );
};
export default ErrorPopup;
