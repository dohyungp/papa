import React, { useState, useMemo, useCallback } from "react";
import { Slider } from "antd";
import { Chart } from "./charts/Chart";
import { binning } from "../lib/functions";

const marks = {
  2: "2",
  1.5: "1.5",
  1: "1",
  0.5: "0.5",
  0.1: "0.1",
  0.05: "0.05",
  0.01: "0.1",
};

const PredRatioChart = ({ companies = [], loading = false }) => {
  const [step, setStep] = useState(2);
  const data = companies.map((v) => v.tendorRatio);
  const bins = useMemo(() => binning(data, step), [data, step]);

  const legendData = bins.map(
    (v) => `${v.start.toFixed(2)} - ${v.end.toFixed(2)}`
  );
  const binCount = bins.map((v) => v.count);
  const onChange = useCallback((v) => setStep(v), []);
  let option = {
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
          title: {
            zoom: "확대",
            back: "복원",
          },
        },
      },
    },
    color: ["#188efa"],
    grid: {
      top: "6",
      right: "5",
      left: "25",
    },
    tooltip: {},
    dataZoom: [
      {
        show: true,
      },
    ],
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
          marks={marks}
          onChange={onChange}
          min={0.01}
          max={2}
          defaultValue={2}
          reverse={true}
          step={null}
        />
      ) : null}
    </>
  );
};

export default PredRatioChart;
