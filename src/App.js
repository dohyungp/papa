import React from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import { useRecoilValueLoadable } from "recoil";
import { bidListQuery } from "./lib/selectors";
import "./App.css";
import { SearchResultList } from "./components/SearchResultList";

function App() {
  const { state, contents } = useRecoilValueLoadable(bidListQuery);
  return (
    <div className="App">
      <SearchForm loading={state === "loading"} />
      <SearchResultList
        loading={state === "loading"}
        pageInfo={contents?.pageInfo}
        itemList={contents?.bidItems}
      />
    </div>
  );
}

export default App;
