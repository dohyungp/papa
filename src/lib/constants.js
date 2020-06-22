import moment from "moment";

export const defaultFromDate = moment()
  .subtract(1, "years")
  .format("YYYY/MM/DD");
export const defaultToDate = moment().format("YYYY/MM/DD");
