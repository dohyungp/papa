import moment from "moment";

export const defaultFromDate = moment()
  .subtract(1, "years")
  .format("YYYY/MM/DD");
export const defaultToDate = moment().format("YYYY/MM/DD");

export const getTendorRatio = (price) => {
  if (price >= 5000000000) return 0.85495;
  else if (price >= 1000000000 && price < 5000000000) return 0.86745;
  else return 0.87745;
};

export const getTendorDiffRatio = (baseAmount, bidAmount, aAmount) => {
  const tendorRatio = getTendorRatio(baseAmount);
  return (((bidAmount - aAmount) / tendorRatio + aAmount) / baseAmount) * 100;
};

export const companyItemKey = (key) => {
  switch (key) {
    case "순번":
      return "key";
    case "사업자번호":
      return "BSN";
    case "상호":
      return "companyName";
    case "입찰금액(원)":
      return "bidPrice";
    case "예가대비투찰률(%)A값 제외":
      return "tendorRatioWithoutA";
    case "선택번호":
      return "selectedNumbers";
    case "입찰서제출일시":
      return "submitDatetime";
    case "비고":
      return "note";
    default:
      return "unknown";
  }
};
