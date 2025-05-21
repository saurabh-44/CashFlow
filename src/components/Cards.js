import React from "react";
import { Card, Row, Col, Button, Typography, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Cards = ({
  currentBalance,
  income,
  expenses,
  showExpenseModal,
  showIncomeModal,
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="cards-container">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card className="card">
            <div className="card-content">
              <Text type="secondary">Current Balance</Text>
              <Title level={3} style={{ margin: "8px 0" }}>
                {formatCurrency(currentBalance)}
              </Title>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="card">
            <div className="card-content">
              <Text type="secondary">Total Income</Text>
              <Title level={3} style={{ margin: "8px 0", color: "var(--success-color)" }}>
                {formatCurrency(income)}
              </Title>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="card">
            <div className="card-content">
              <Text type="secondary">Total Expenses</Text>
              <Title level={3} style={{ margin: "8px 0", color: "var(--error-color)" }}>
                {formatCurrency(expenses)}
              </Title>
            </div>
          </Card>
        </Col>
      </Row>

      <div className="action-buttons mt-4">
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showIncomeModal}
            size="large"
          >
            Add Income
          </Button>
          <Button
            icon={<PlusOutlined />}
            onClick={showExpenseModal}
            size="large"
          >
            Add Expense
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Cards;
