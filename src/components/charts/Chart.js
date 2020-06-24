import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";

export const Chart = ({ option }) => {
  const chart = useRef(null);

  useEffect(() => {
    let barChart =
      echarts.getInstanceByDom(chart.current) || echarts.init(chart.current);
    barChart.setOption(option);
    window.addEventListener("resize", () => barChart.resize());
  }, [option]);
  return <div ref={chart} style={{ width: "100%", minHeight: "300px" }} />;
};
