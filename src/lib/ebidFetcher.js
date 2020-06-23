import { postForm } from "./fetch";
import { defaultFromDate, defaultToDate } from "./constants";

const DDS_REGEX = /fn_dds_open\('(\d+)', '(\d+)', '(\w*)', '(\d+)', '(\d+)', '(\d+)'\)/;
const PAGE_REGEX = /goPage\('(\d+)'\)/;

function getBidDetailInfo(bidList) {
  const detailInfo = bidList.map((v) => {
    let title = null;
    let openBidEndDate = null;
    const [, bidNum, bidDegree, isOpen, status, ,] = DDS_REGEX.exec(
      v.getAttribute("onclick")
    );
    const titleElem = v.getElementsByTagName("strong");
    const rawBidDate = v.querySelector(".clear");
    if (rawBidDate)
      openBidEndDate = rawBidDate.textContent
        .trim()
        .replace("개찰마감일시: ", "");
    if (titleElem.length > 0)
      title = titleElem[0].innerText.trim().replace("입찰건명: ", "");
    return {
      title,
      bidNum,
      bidDegree,
      isPrivate: isOpen !== "Y",
      status: status === "07" ? "유찰" : "개찰",
      openBidEndDate,
    };
  });

  return detailInfo;
}

function getPage(pageAnchor) {
  if (!pageAnchor) return { hasMore: false };
  const [, page] = PAGE_REGEX.exec(pageAnchor.getAttribute("onclick"));
  return {
    hasMore: true,
    next: page,
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
  const pageAnchor = dom.querySelector(".paging span").nextElementSibling;
  bidList = Array.from(bidList); // Cast from NodeList to Array
  // pageAnchors = Array.from(pageAnchors);
  const bidItems = getBidDetailInfo(bidList);
  const pageInfo = getPage(pageAnchor);
  return {
    pageInfo,
    bidItems,
  };
}

function getBidInfo(infoElems) {
  const bidInfo = infoElems.map((v) => {
    return {
      type: v.querySelector("th")?.innerText?.trim(),
      value: v.querySelector("td")?.innerText?.trim(),
    };
  });
  return bidInfo;
}

function getBasePriceSelectionResults(basePriceElems) {
  const basePriceResults = basePriceElems.map((v) => {
    return {
      basePrices: v.innerText?.trim(),
      selectionCnt: parseInt(v.nextElementSibling?.innerText),
    };
  });
  return basePriceResults;
}

export async function getBidDetail(bidNum, bidDegree) {
  const data = await postForm(`/ebid.mo.ts.cmd.MobileTenderOpenDetailCmd.dev`, {
    bidNum,
    bidDegree,
  });
  const dom = new DOMParser().parseFromString(data, "text/html");
  let infoElems = dom.querySelectorAll("[class=table-default] tr");
  let basePriceElems = dom.querySelectorAll("td.txt-right");
  infoElems = Array.from(infoElems);
  basePriceElems = Array.from(basePriceElems);
  const basePriceResults = getBasePriceSelectionResults(basePriceElems);
  const bidInfo = getBidInfo(infoElems);
  return {
    basePriceResults,
    bidInfo,
  };
}
