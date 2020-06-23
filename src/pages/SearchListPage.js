import React from "react";
import SearchForm from "../components/SearchForm";
import { useRecoilValueLoadable } from "recoil";
import { bidListQuery } from "../lib/selectors";
import { SearchResultList } from "../components/SearchResultList";

function SearchListPage() {
  const { state, contents } = useRecoilValueLoadable(bidListQuery);
  return (
    <div>
      <SearchForm loading={state === "loading"} />
      <SearchResultList
        loading={state === "loading"}
        pageInfo={contents?.pageInfo}
        itemList={contents?.bidItems}
      />
    </div>
  );
}

export default SearchListPage;
