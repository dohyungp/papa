import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DetailHeader } from "../components/DetailHeader";
import { getBidDetail } from "../lib/ebidFetcher";

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
    </div>
  );
}

export default BidDetailPage;
