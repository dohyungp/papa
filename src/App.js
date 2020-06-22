import React, { useState } from "react";
import { defaultFromDate, defaultToDate } from "./lib/constants";
import moment from "moment";
import { getBidList } from "./lib/ebidFetcher";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [bidName, setBidName] = useState("");
  const [bidNum, setBidNum] = useState("");
  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(defaultToDate);
  const [result, setResult] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await getBidList({
      searchTerm: bidName,
      bidNum,
      fromDate,
      toDate,
    });
    setIsLoading(false);
    setResult(data);
  };
  return (
    <div className="App">
      <div className="search-box">
        <form onSubmit={handleSubmit}>
          <table>
            <colgroup>
              <col style={{ width: "30%" }} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th>공고번호</th>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setBidNum(e.target.value)}
                    maxLength="7"
                    placeholder="공고번호를 입력하세요"
                    value={bidNum}
                  />
                </td>
              </tr>
              <tr>
                <th>개찰 조회기간</th>
                <td>
                  <input
                    type="date"
                    onChange={(e) =>
                      setFromDate(moment(e.target.value).format("YYYY/MM/DD"))
                    }
                  />
                  <input
                    type="date"
                    onChange={(e) =>
                      setToDate(moment(e.target.value).format("YYYY/MM/DD"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <th>입찰건명</th>
                <td>
                  <input
                    type="text"
                    placeholder="입찰건명을 입력하세요"
                    value={bidName}
                    onChange={(e) => setBidName(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button>검색</button>
        </form>
      </div>
      {isLoading ? "로딩 중" : ""}
      {result?.bidDetailInfo?.map((elem) => {
        return (
          <div className="item-list" key={elem.bidNum}>
            {elem.bidNum} / {elem.title}
          </div>
        );
      })}
    </div>
  );
}

export default App;
