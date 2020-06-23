import React from "react";
import { QueryState } from "../lib/atoms";
import { useRecoilState } from "recoil";
import { Divider, List, Button, Descriptions } from "antd";

export const SearchResultList = ({
  itemList = [],
  loading = false,
  pageInfo = {},
}) => {
  const getStatus = (row) => {
    if (row.isPrivate && row.status !== "유찰") return "비공개";
    else if (row.status === "유찰") return "유찰";
    else return "공개";
  };

  const [query, setQuery] = useRecoilState(QueryState);
  const onLoadMore = () => {
    setQuery({ ...query, targetRow: pageInfo?.next });
  };
  return (
    <>
      <Divider orientation="left">검색 결과</Divider>
      <List
        style={{ minHeight: "350px" }}
        loading={loading}
        itemLayout="vertical"
        loadMore={
          pageInfo?.hasMore ? (
            <div className="load-more-button">
              <Button size="large" onClick={onLoadMore}>
                다음 페이지
              </Button>
            </div>
          ) : null
        }
        dataSource={itemList}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.title} />
            <Descriptions size="middle" column={4}>
              <Descriptions.Item label="공고번호">
                {item.bidNum}
              </Descriptions.Item>
              <Descriptions.Item label="개찰내용">
                {getStatus(item)}
              </Descriptions.Item>
              <Descriptions.Item label="공고 유형">
                {item.bidDegree === "00" ? "일반공고" : "정정공고"}
              </Descriptions.Item>
              <Descriptions.Item label="개찰마감일시">
                {item.openBidEndDate}
              </Descriptions.Item>
            </Descriptions>
          </List.Item>
        )}
      ></List>
    </>
  );
};
