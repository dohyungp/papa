import React from "react";
import { QueryState } from "../lib/atoms";
import { useRecoilState } from "recoil";
import { Divider, List, Button } from "antd";

export const SearchResultList = ({
  itemList = [],
  loading = false,
  pageInfo = {},
}) => {
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
            <List.Item.Meta title={item.title} description={item.bidNum} />
          </List.Item>
        )}
      ></List>
    </>
  );
};
