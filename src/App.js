import React from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import { useRecoilValueLoadable } from "recoil";
import { bidListQuery } from "./lib/selectors";
import "./App.css";

function App() {
  const searchResult = useRecoilValueLoadable(bidListQuery);
  return (
    <div className="App">
      <SearchForm loading={searchResult.state === "loading"} />
      {JSON.stringify(searchResult)}
    </div>
  );
}

export default App;
