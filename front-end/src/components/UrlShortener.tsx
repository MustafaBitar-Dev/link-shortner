import React, { useState } from 'react';
import { Form, Input, Button, message, Card, Typography } from 'antd';
import { v4 as uuid } from 'uuid';

const { Title, Text } = Typography;

interface FormValues {
  url: string;
}

interface ApiResponse {
  shortUrl: string;
  shortCode: string;
}

const UrlShortener: React.FC = () => {
  const [shortUrl, setShortUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<FormValues>();

  // Generate or retrieve guestId
  const getGuestHeaders = (): Record<string, string> => {
    let guestId = localStorage.getItem('guestId');
    if (!guestId) {
      guestId = uuid();
      localStorage.setItem('guestId', guestId);
    }

    return {
      'Content-Type': 'application/json',
      'X-Guest-Id': guestId
    };
  };

  const onFinish = async (values: FormValues): Promise<void> => {
    setLoading(true);
    try {
      const headers = getGuestHeaders();

      const response = await fetch('http://localhost:3000/api/shorten', {
        method: 'POST',
        headers,
        body: JSON.stringify({ url: values.url })
      });

      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      }

      const data: ApiResponse = await response.json();
      setShortUrl(data.shortUrl);
      message.success('URL shortened successfully!');
      form.resetFields();
    } catch (error) {
      message.error('Failed to shorten URL');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 600, margin: '50px auto' }}>
      <Title level={2}>Enter Your URL</Title>

      <Form 
        form={form}
        onFinish={onFinish} 
        layout="vertical"
      >
        <Form.Item
          name="url"
          label=""
          rules={[
            { required: true, message: 'Please enter a URL!' },
            { type: 'url', message: 'Please enter a valid URL!' }
          ]}
        >
          <Input placeholder="https://example.com" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Make It Shorter!
          </Button>
        </Form.Item>
      </Form>

      {shortUrl && (
        <div style={{ marginTop: 20 }}>
          <Text strong>Shortened URL: </Text>
          <Text copyable>{shortUrl}</Text>
        </div>
      )}
    </Card>
  );
};

export default UrlShortener;
