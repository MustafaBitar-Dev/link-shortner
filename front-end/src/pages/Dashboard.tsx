import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Typography, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

interface Link {
  id: string;
  originalUrl: string;
  shortUrl: string;
}

interface User {
  username: string;
  email: string;
}

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock: Fetch user info from your auth context or state
  const [user, setUser] = useState<User | null>({
    username: 'mustafa',
    email: 'mustafa@example.com',
  });

  // Mock: Links created by the user (replace with API call)
  const [links, setLinks] = useState<Link[]>([
    { id: '1', originalUrl: 'https://google.com', shortUrl: 'https://short.ly/g1' },
    { id: '2', originalUrl: 'https://example.com', shortUrl: 'https://short.ly/e2' },
  ]);

  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editRowData, setEditRowData] = useState<Partial<Link>>({});

  const isEditing = (record: Link) => record.id === editingKey;

  const startEdit = (record: Link) => {
    setEditingKey(record.id);
    setEditRowData(record);
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setEditRowData({});
  };

  const saveEdit = () => {
    // Here you call your API to save edited data
    setLinks((prev) =>
      prev.map((link) => (link.id === editingKey ? { ...link, ...editRowData } : link))
    );
    message.success('Link updated successfully');
    cancelEdit();
  };

  const deleteLink = (id: string) => {
    // Call API to delete then update UI
    setLinks((prev) => prev.filter((link) => link.id !== id));
    message.success('Link deleted');
  };

  const onChangeEditField = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Link) => {
    setEditRowData({ ...editRowData, [field]: e.target.value });
  };

  const columns = [
    {
      title: 'Original URL',
      dataIndex: 'originalUrl',
      key: 'originalUrl',
      render: (_: any, record: Link) =>
        isEditing(record) ? (
          <Input
            value={editRowData.originalUrl}
            onChange={(e) => onChangeEditField(e, 'originalUrl')}
          />
        ) : (
          <a href={record.originalUrl} target="_blank" rel="noopener noreferrer">
            {record.originalUrl}
          </a>
        ),
    },
    {
      title: 'Short URL',
      dataIndex: 'shortUrl',
      key: 'shortUrl',
      render: (_: any, record: Link) =>
        isEditing(record) ? (
          <Input
            value={editRowData.shortUrl}
            onChange={(e) => onChangeEditField(e, 'shortUrl')}
          />
        ) : (
          <a href={record.shortUrl} target="_blank" rel="noopener noreferrer">
            {record.shortUrl}
          </a>
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Link) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button type="link" icon={<SaveOutlined />} onClick={saveEdit} />
            <Button type="link" onClick={cancelEdit}>
              Cancel
            </Button>
          </Space>
        ) : (
          <Space>
            <Button type="link" icon={<EditOutlined />} onClick={() => startEdit(record)} />
            <Popconfirm
              title="Are you sure to delete this link?"
              onConfirm={() => deleteLink(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
            <Button
              type="link"
              icon={<InfoCircleOutlined />}
              onClick={() => navigate(`/info/${record.id}`)}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Table dataSource={links} columns={columns} rowKey="id" />
    </div>
  );
};

export default Dashboard;
