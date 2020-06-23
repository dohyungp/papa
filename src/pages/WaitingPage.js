import React from "react";
import { Result } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const WaitingPage = () => {
  return <Result icon={<LoadingOutlined />} title="잠시만 기다려주세요" />;
};
