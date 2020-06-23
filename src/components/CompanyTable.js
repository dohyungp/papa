import React from "react";
import { Table, Tag } from "antd";

const columns = [
  {
    title: "사업자등록번호",
    dataIndex: "BSN",
    key: "BSN",
    responsive: ["lg"],
  },
  {
    title: "상호",
    dataIndex: "companyName",
    key: "companyName",
  },
  {
    title: "입찰금액(원)",
    dataIndex: "bidPrice",
    key: "bidPrice",
  },
  {
    title: "예가대비투찰율(%)",
    dataIndex: "tendorRatioWithoutA",
    key: "tendorRatioWithoutA",
  },
  {
    title: "기초대비사정률(%)",
    dataIndex: "tendorRatio",
    key: "tendorRatio",
    render: (v) => parseFloat(v).toFixed(3),
  },
  {
    title: "선택번호",
    dataIndex: "selectedNumbers",
    key: "selectedNumbers",
    responsive: ["lg"],
    render: (nums) => (
      <span>
        {nums.split("/").map((num) => (
          <Tag color="geekblue">{num}</Tag>
        ))}
      </span>
    ),
  },
  {
    title: "제출일시",
    dataIndex: "submitDatetime",
    key: "submitDatetime",
    responsive: ["md"],
  },
  {
    title: "비고",
    dataIndex: "note",
    key: "note",
    responsive: ["lg"],
  },
];

export const CompanyTable = ({ source, loading = false }) => {
  return <Table dataSource={source} columns={columns} loading={loading} />;
};
