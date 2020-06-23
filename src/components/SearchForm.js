import React from "react";
import moment from "moment";
import { Form, Input, DatePicker, Select, Button } from "antd";
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
  const [form] = Form.useForm();
  const [, setQuery] = useRecoilState(QueryState);
  const onReset = () => {
    form.resetFields();
    setQuery({});
  };
  const onFinish = (values) => {
    const { searchTerm, bidNum, bidDateRange, jobCd } = values;
    let [fromDate, toDate] = bidDateRange;
    fromDate = fromDate.format("YYYY/MM/DD");
    toDate = toDate.format("YYYY/MM/DD");
    setQuery({
      fromDate,
      toDate,
      searchTerm,
      bidNum,
      jobCd,
    });
  };

  return (
    <Form
      form={form}
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
        <Form.Item name="jobCd" label="업무 구분">
          <Select placeholder="업무구분을 선택하세요" allowClear>
            <Select.Option value="10">시설공사</Select.Option>
            <Select.Option value="20">용역</Select.Option>
            <Select.Option value="30">물품</Select.Option>
            <Select.Option value="40">지급자재</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="개찰마감일자 범위" name="bidDateRange">
          <RangePicker style={{ width: "100%" }} format="YYYY/MM/DD" />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ marginRight: "8px" }}
          >
            검색
          </Button>

          <Button htmlType="button" onClick={onReset}>
            초기화
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default SearchForm;
