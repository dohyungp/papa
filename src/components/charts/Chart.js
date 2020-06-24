import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";
import { Spin } from "antd";

export const Chart = ({ option, loading = false }) => {
  const chart = useRef(null);

  useEffect(() => {
    let barChart =
      echarts.getInstanceByDom(chart.current) || echarts.init(chart.current);
    barChart.setOption(option);
    window.addEventListener("resize", () => barChart.resize());
  }, [option]);
  return (
    <Spin spinning={loading}>
      <div ref={chart} style={{ width: "100%", minHeight: "300px" }} />
    </Spin>
  );
};
