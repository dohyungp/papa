import React from "react";
import moment from "moment";
import { Form, Input, DatePicker, Button, Spin } from "antd";
import { QueryState } from "../lib/atoms";
import { useRecoilState } from "recoil";
import { defaultFromDate, defaultToDate } from "../lib/constants";
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const buttonItemLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const SearchForm = ({ loading = false }) => {
  const [, setQuery] = useRecoilState(QueryState);
  const onFinish = (values) => {
    const { searchTerm, bidNum, bidDateRange } = values;
    let [fromDate, toDate] = bidDateRange;
    fromDate = fromDate.format("YYYY/MM/DD");
    toDate = toDate.format("YYYY/MM/DD");
    setQuery({
      fromDate,
      toDate,
      searchTerm,
      bidNum,
    });
  };

  return (
    <Spin spinning={loading}>
      <Form
        onFinish={onFinish}
        {...formItemLayout}
        initialValues={{
          bidDateRange: [
            moment(defaultFromDate, "YYYY/MM/DD"),
            moment(defaultToDate, "YYYY/MM/DD"),
          ],
        }}
        layout="horizontal"
        name="search-form"
        size="large"
        className="ant-search-form"
      >
        <div className="ant-search-form-wrapper">
          <Form.Item name="bidNum" label="공고번호">
            <Input placeholder={"공고번호를 입력하세요"} />
          </Form.Item>
          <Form.Item name="searchTerm" label="입찰건명">
            <Input placeholder={"입찰건명을 입력하세요"} />
          </Form.Item>
          <Form.Item label="개찰마감일자 범위" name="bidDateRange">
            <RangePicker style={{ width: "100%" }} format="YYYY/MM/DD" />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">
              조회하기
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Spin>
  );
};

export default SearchForm;
