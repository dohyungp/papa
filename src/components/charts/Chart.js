import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";
import { Spin } from "antd";
import ErrorPopup from "../ErrorPopup";

export const Chart = ({ option, loading = false, error = false }) => {
  const chart = useRef(null);

  useEffect(() => {
    let barChart =
      echarts.getInstanceByDom(chart.current) || echarts.init(chart.current);
    barChart.setOption(option);
    window.addEventListener("resize", () => barChart.resize());
  }, [option]);
  return (
    <Spin spinning={loading}>
      <ErrorPopup error={error} message="데이터가 없습니다.">
        <div ref={chart} style={{ width: "100%", minHeight: "300px" }} />
      </ErrorPopup>
    </Spin>
  );
};
