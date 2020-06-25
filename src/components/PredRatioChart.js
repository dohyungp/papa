import React, { useState } from "react";
import { Slider } from "antd";
import { Chart } from "./charts/Chart";
import { binning } from "../lib/functions";

const PredRatioChart = ({ companies = [], loading = false }) => {
  const [step, setStep] = useState(2);
  const data = companies.map((v) => v.tendorRatio);
  const bins = binning(data, step);

  const legendData = bins.map(
    (v) => `${v.start.toFixed(2)} - ${v.end.toFixed(2)}`
  );
  const binCount = bins.map((v) => v.count);

  let option = {
    color: ["#188efa"],
    grid: {
      top: "6",
      right: "0",
      bottom: "17",
      left: "25",
    },
    tooltip: {},
    toolbox: { feature: { dataZoom: {} } },
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
    series: [{ data: binCount, type: "bar" }],
  };
  return (
    <>
      <Chart
        option={option}
        loading={loading}
        error={!loading && (legendData.length === 0 || binCount.length === 0)}
      />
      {!loading && (legendData.length !== 0 || binCount.length !== 0) ? (
        <Slider
          onChange={(v) => setStep(v)}
          min={0.01}
          max={2}
          defaultValue={2}
          reverse={true}
          step={0.01}
        />
      ) : null}
    </>
  );
};

export default PredRatioChart;
