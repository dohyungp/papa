import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Divider } from "antd";
import { DetailHeader } from "../components/DetailHeader";
import { CompanyTable } from "../components/CompanyTable";
import { getBidDetail } from "../lib/ebidFetcher";
import PredPriceChart from "../components/PredPriceChart";
import PredRatioChart from "../components/PredRatioChart";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function BidDetailPage() {
  const query = useQuery();
  const bidNum = query.get("bidNum");
  const bidDegree = query.get("bidDegree");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const f = async () => {
      setLoading(true);
      const data = await getBidDetail({ bidNum, bidDegree });
      setData(data);
      setLoading(false);
    };
    f();
  }, [bidDegree, bidNum]);
  return (
    <div>
      <DetailHeader bidInfo={data?.bidInfo || []} loading={loading} />
      <Divider orientation="left">예정가격 결과</Divider>
      <PredPriceChart
        predPriceResults={data?.predPriceResults}
        loading={loading}
      />
      <Divider orientation="left">기초대비사정율 그래프</Divider>
      <PredRatioChart companies={data?.companyBiddingList} loading={loading} />
      <Divider orientation="left">참여업체 목록</Divider>
      <CompanyTable source={data?.companyBiddingList || []} loading={loading} />
    </div>
  );
}

export default BidDetailPage;
