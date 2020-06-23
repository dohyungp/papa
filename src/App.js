import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import SearchListPage from "./pages/SearchListPage";
import BidDetailPage from "./pages/BidDetailPage";
import "./App.css";

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
