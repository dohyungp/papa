import { postForm } from "./fetch";
import moment from "moment";

const DDS_REGEX = /fn_dds_open\('(\d+)', '(\d+)'/;
const PAGE_REGEX = /goPage\('(\d+)'\)/;
const defaultFromDate = moment().subtract(1, "years").format("YYYY/MM/DD");
const defaultToDate = moment().format("YYYY/MM/DD");

function getBidDetailInfo(bidList) {
  const detailInfo = bidList.map((v) => {
    const [, bidNum, bidDegree] = DDS_REGEX.exec(v.getAttribute("onclick"));
    return {
      bidNum,
      bidDegree,
    };
  });

  return detailInfo;
}

function getPageList(pageAnchors) {
  const pageList = pageAnchors.map((v) => {
    const [, page] = PAGE_REGEX.exec(v.getAttribute("onclick"));
    return page;
  });
  return {
    hasMore: pageAnchors.length !== 0,
    pageList,
  };
}

export async function getBidList({
  searchTerm = "",
  jobCd = "",
  bidNum = "",
  targetRow = 1,
  fromDate = defaultFromDate,
  toDate = defaultToDate,
} = {}) {
  const data = await postForm(`/ebid.mo.ts.cmd.MobileTenderOpenListCmd.dev`, {
    s_cstrtnJobGbCd: jobCd,
    s_openDtm1: fromDate,
    s_openDtm2: toDate,
    s_bidnmKor: searchTerm,
    s_bidNum: bidNum,
    targetRow: targetRow,
    gubun: "Y",
  });

  let dom = new DOMParser().parseFromString(data, "text/html");
  let bidList = dom.querySelectorAll(".list li[onclick]");
  let pageAnchors = dom.querySelectorAll(".paging a");
  bidList = Array.from(bidList); // Cast from NodeList to Array
  pageAnchors = Array.from(pageAnchors);
  const bidDetailInfo = getBidDetailInfo(bidList);
  const pageInfo = getPageList(pageAnchors);
  console.log({
    pageInfo,
    bidDetailInfo,
  });
}
