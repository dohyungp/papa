import React from "react";
import { Chart } from "./charts/Chart";

const PredPriceChart = ({ predPriceResults = [], loading = false }) => {
  const legendData = predPriceResults.map((v) => v.price);
  const data = predPriceResults.map((v) => {
    return {
      value: v.count,
      itemStyle: { color: v.selected ? "#f74153" : "#fcb0b8" },
    };
  });
  let option = {
    grid: {
      top: "6",
      right: "0",
      bottom: "17",
      left: "25",
    },
    tooltip: {},
    xAxis: {
      data: legendData,
      type: "category",
      axisLine: {
        lineStyle: {
          color: "#ccc",
        },
      },
      axisLabel: {
        fontSize: 10,
        color: "#666",
      },
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          color: "#ddd",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#ccc",
        },
      },
      axisLabel: {
        fontSize: 10,
        color: "#666",
      },
    },
    series: [{ data, type: "bar" }],
  };
  return (
    <Chart
      option={option}
      loading={loading}
      error={!loading && (legendData.length === 0 || data.length === 0)}
    />
  );
};

export default PredPriceChart;
