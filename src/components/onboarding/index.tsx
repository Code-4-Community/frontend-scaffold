import { Card, Typography } from 'antd';
import React from 'react';
const { Title, Paragraph } = Typography;

interface ResponseCardProps {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const ResponseCard: React.FC<ResponseCardProps> = ({
  id,
  title,
  body,
  userId,
}) => {
  return (
    <Card bodyStyle={{ width: '200px' }}>
      <Title level={1}>{id}</Title>
      <Paragraph>{body}</Paragraph>
    </Card>
  );
};
