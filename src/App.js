import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import SearchListPage from "./pages/SearchListPage";
import BidDetailPage from "./pages/BidDetailPage";
import "./App.css";
// import { WaitingPage } from "./pages/WaitingPage";

// const SearchListPage = lazy(() => import("./pages/SearchListPage"));
// const BidDetailPage = lazy(() => import("./pages/BidDetailPage"));

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SearchListPage} />
          <Route path="/detail" component={BidDetailPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
