import { postForm } from "./fetch";
import { defaultFromDate, defaultToDate } from "./constants";

const DDS_REGEX = /fn_dds_open\('(\d+)', '(\d+)'/;
const PAGE_REGEX = /goPage\('(\d+)'\)/;

function getBidDetailInfo(bidList) {
  const detailInfo = bidList.map((v) => {
    let title = null;
    const [, bidNum, bidDegree] = DDS_REGEX.exec(v.getAttribute("onclick"));
    const titleElem = v.getElementsByTagName("strong");
    if (titleElem.length > 0)
      title = titleElem[0].innerText.trim().replace("입찰건명: ", "");
    return {
      title,
      bidNum,
      bidDegree,
    };
  });

  return detailInfo;
}

function getPageList(pageAnchors) {
  const pageList = pageAnchors.map((v) => {
    const [, page] = PAGE_REGEX.exec(v.getAttribute("onclick"));
    return { code: page, text: v.text };
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
  return {
    pageInfo,
    bidDetailInfo,
  };
}
