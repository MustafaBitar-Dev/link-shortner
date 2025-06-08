import React, { useState } from 'react';
import { Card, Table, Typography } from 'antd';

const { Title, Text } = Typography;

const dummyData = {
  originalUrl: 'https://example.com/some/long/url',
  shortUrl: 'https://short.ly/abc123',
  totalClicks: 5,
  clicks: [
    { time: '2025-06-08T12:30:00Z', referrer: 'https://google.com', ip: '192.168.1.1' },
    { time: '2025-06-08T13:00:00Z', referrer: 'https://twitter.com', ip: '192.168.1.2' },
    { time: '2025-06-08T14:15:00Z', referrer: '', ip: '192.168.1.3' },
    { time: '2025-06-08T15:45:00Z', referrer: 'https://facebook.com', ip: '192.168.1.4' },
    { time: '2025-06-08T16:10:00Z', referrer: '', ip: '192.168.1.5' },
  ],
};

const columns = [
  {
    title: 'Click Time',
    dataIndex: 'time',
    key: 'time',
    render: (text: string) => new Date(text).toLocaleString(),
  },
  {
    title: 'Referrer',
    dataIndex: 'referrer',
    key: 'referrer',
    render: (text: string) => text || 'Direct',
  },
  {
    title: 'IP Address',
    dataIndex: 'ip',
    key: 'ip',
  },
];

const LinkInfoPage = () => {
  const [linkInfo] = useState(dummyData);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto' }}>
      <Card style={{ marginBottom: 24 }}>
        <Title level={3}>Link Information</Title>
        <Text><strong>Original URL:</strong> {linkInfo.originalUrl}</Text><br />
        <Text><strong>Short URL:</strong> {linkInfo.shortUrl}</Text><br />
        <Text><strong>Total Clicks:</strong> {linkInfo.totalClicks}</Text>
      </Card>

      <Card>
        <Title level={4}>Click Records</Title>
        <Table dataSource={linkInfo.clicks} columns={columns} rowKey="time" />
      </Card>
    </div>
  );
};

export default LinkInfoPage;
