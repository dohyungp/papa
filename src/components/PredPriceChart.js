import React from "react";
import { Chart } from "./charts/Chart";

const PredPriceChart = ({ predPriceResults = [] }) => {
  let option = {
    dataset: {
      dimensions: ["price", "count"],
      source: predPriceResults,
    },
    color: ["#F74153"],
    grid: {
      top: "6",
      right: "0",
      bottom: "17",
      left: "25",
    },
    tooltip: {},
    xAxis: {
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
    series: [{ type: "bar" }],
  };
  return <Chart option={option} />;
};

export default PredPriceChart;
