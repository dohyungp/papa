import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { PageHeader, Descriptions, Spin } from "antd";
import { Link } from "react-router-dom";

export const DetailHeader = ({ bidInfo = [], loading = false } = {}) => {
  const title = bidInfo[1]?.value || "공고 명";
  const descriptions = [...bidInfo?.slice(0, 1), ...bidInfo?.slice(2)];
  return (
    <Spin spinning={loading}>
      <div className="detail-page-header">
        <PageHeader
          ghost={false}
          backIcon={
            <Link to="/">
              <ArrowLeftOutlined />
            </Link>
          }
          onBack={() => null}
          title={title}
        >
          <Descriptions>
            {descriptions.map((desc) => {
              return (
                <Descriptions.Item label={desc?.type} key={desc?.type}>
                  {desc?.value}
                </Descriptions.Item>
              );
            })}
          </Descriptions>
        </PageHeader>
      </div>
    </Spin>
  );
};
