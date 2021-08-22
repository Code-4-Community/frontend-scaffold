import React, { useState } from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import styled from 'styled-components';
import { ResponseCard } from '../../components/onboarding';

const { Title, Paragraph } = Typography;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
`;

const FormCard = styled(Card)`
  display: flex;
  width: 50%;
  border-radius: 5px;
`;

const OnboardingPageTitle = styled(Title)`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const FormInput = styled(Input)`
  display: flex;
  width: 80%;
  border: 1px 1px black;
`;

const StyledButton = styled(Button)`
  width: 30%;
  margin-top: 16px;
`;

const ResponseContainer = styled.div`
  width: 75%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 16px;
`;

const SuccessMessage = styled(Paragraph)`
  color: green;
`;

interface OnboardingRequestData {
    favoriteColor: string
}

interface OnboardingResponseData {
    id: number;
    title: string;
    body: string;
    userId: number;
}

const Onboarding: React.FC = () => {
  const [posts, setPosts] = useState<OnboardingResponseData[]>([]);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);

  const updatePosts = async () => {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => setPosts(json));
  };

  const onFinish = async (values: OnboardingRequestData) => {
    setFormSuccess(false);
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({favoriteColor: values.favoriteColor}),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    setFormSuccess(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Container>
        <OnboardingPageTitle>
          Code4Community Frontend Onboarding Tutorial!
        </OnboardingPageTitle>
        <FormCard bodyStyle={{ width: '100%' }}>
          <Title>Form!</Title>
          <Paragraph>This is an example form card.</Paragraph>
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              label="Favorite color"
              name="favoriteColor"
              rules={[
                {
                  required: true,
                  message: 'Just tell me your favorite color :)',
                },
              ]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          {formSuccess && <SuccessMessage>Success!</SuccessMessage>}
        </FormCard>
        <StyledButton onClick={updatePosts}>Get Posts</StyledButton>
        <ResponseContainer>
          {posts.map(function (object, i) {
            return (
              <ResponseCard
                id={object.id}
                key={i}
                title={object.title}
                body={object.body}
                userId={object.userId}
              />
            );
          })}
        </ResponseContainer>
      </Container>
    </>
  );
};

export default Onboarding;
