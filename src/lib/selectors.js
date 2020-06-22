import { QueryState } from "./atoms";
import { selector } from "recoil";
import { getBidList } from "./ebidFetcher";

function isEmpty(param) {
  return Object.keys(param).length === 0 && param.constructor === Object;
}

export const bidListQuery = selector({
  key: "bidListQuery",
  get: async ({ get }) => {
    const queryState = get(QueryState);
    if (isEmpty(queryState)) return {};
    else return await getBidList(get(QueryState));
  },
});
