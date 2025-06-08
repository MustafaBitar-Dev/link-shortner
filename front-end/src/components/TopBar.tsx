import React from 'react';
import { Layout, Menu, Button, Space } from 'antd';

const { Header } = Layout;

const TopBar: React.FC = () => {
  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Left side */}
      <Menu theme="dark" mode="horizontal" selectable={false} style={{ flex: 1, display: 'flex', gap: '10px' }}>
        <Space>
        <Button type="text" href="/" style={{ color: 'white' }}>
          Home
        </Button>
        <Button type="text" href="/dashboard" style={{ color: 'white' }}>
          Saved URL
        </Button>
      </Space>
      </Menu>

      {/* Right side */}
      <Space>
        <Button type="primary" href="/login">
          Login
        </Button>
        <Button href="/signup">
          Signup
        </Button>
      </Space>
    </Header>
  );
};

export default TopBar;
