import React from 'react';
import { Helmet } from 'react-helmet';
import './home.less';
import { Typography } from 'antd';
const { Title } = Typography;

/*
Template for future page components.

AntD Components:
https://ant.design/components/overview/
*/

const Template: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Title goes here</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="content-container">
        {/*
          Place relevant components in here
        */}
        <Title>Code4Community Frontend Scaffold</Title>
        <Title level={3}>
          Built with React.js, Typescript, and AntD components.
        </Title>
      </div>
    </>
  );
};

export default Template;