import { postForm } from "./fetch";
import {
  defaultFromDate,
  defaultToDate,
  companyItemKey,
  getTendorDiffRatio,
} from "./constants";

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

function getPredPriceSelectionResults(basePriceElems) {
  const basePriceResults = basePriceElems.map((v) => {
    return {
      basePrices: v.innerText?.trim(),
      selectionCnt: parseInt(v.nextElementSibling?.innerText),
    };
  });
  return basePriceResults;
}

function getBaseCompanyDetails(companyDetailElems) {
  const companyDetails = companyDetailElems.map((v) => {
    let companyInfo = v.querySelectorAll("li");
    companyInfo = Array.from(companyInfo);
    let company = {};
    companyInfo.map((c) => {
      let rawText = c?.innerText;
      if (!rawText) return null;
      let [k, ...v] = rawText.split(":");
      k = k.trim();
      v = v.join(":").trim();
      company[companyItemKey(k)] = v;
      return null;
    });
    return company;
  });
  return companyDetails;
}

function calcTendorRatio(bidInfo, companyBiddingList) {
  let basePrice = null;
  let aPrice = null;
  for (let i = 0; i < bidInfo.length; i++)
    if (bidInfo[i].type === "기초금액") {
      [basePrice] = bidInfo[i].value?.split("원");
      basePrice = basePrice?.trim();
      basePrice = parseInt(basePrice?.split(",")?.join(""));
    } else if (bidInfo[i].type === "가격점수제외금액(A)") {
      [aPrice] = bidInfo[i].value?.split("원");
      aPrice = aPrice?.trim();
      aPrice = parseInt(aPrice?.split(",")?.join(""));
    }
  return companyBiddingList.map((company) => {
    const bidPrice = parseInt(company?.bidPrice?.split(",")?.join(""));
    const tendorRatio = getTendorDiffRatio(basePrice, bidPrice, aPrice);
    return {
      ...company,
      tendorRatio,
    };
  });
}

export async function getBidDetail({ bidNum, bidDegree } = {}) {
  const data = await postForm(`/ebid.mo.ts.cmd.MobileTenderOpenDetailCmd.dev`, {
    bidNum,
    bidDegree,
  });
  const dom = new DOMParser().parseFromString(data, "text/html");
  let infoElems = dom.querySelectorAll("[class=table-default] tr");
  let predPriceElems = dom.querySelectorAll("td.txt-right");
  let companyDetailElems = dom.querySelectorAll(".detail-list");
  infoElems = Array.from(infoElems);
  predPriceElems = Array.from(predPriceElems);
  companyDetailElems = Array.from(companyDetailElems);
  let companyBiddingList = getBaseCompanyDetails(companyDetailElems);
  const bidInfo = getBidInfo(infoElems);
  const predPriceResults = getPredPriceSelectionResults(predPriceElems);
  companyBiddingList = calcTendorRatio(bidInfo, companyBiddingList);
  return {
    predPriceResults,
    bidInfo,
    companyBiddingList,
  };
}
