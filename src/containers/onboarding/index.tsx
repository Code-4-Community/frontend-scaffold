import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import styled from 'styled-components';
import { ResponseCard } from '../../components/onboarding';
import ProtectedApiClient from '../../api/protectedApiClient';
import { OnboardingResponseData } from '../../api/protectedApiClient';
import {
  AsyncRequest,
  AsyncRequestCompleted,
  AsyncRequestFailed,
  asyncRequestIsComplete,
  AsyncRequestLoading,
  AsyncRequestNotStarted,
} from '../../utils/asyncRequest';

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
  favoriteColor: string;
  id: number;
}

const Onboarding: React.FC = () => {
  const [posts, setPosts] = useState<
    AsyncRequest<OnboardingResponseData[], any>
  >(AsyncRequestNotStarted());
  const [post, setPost] = useState<AsyncRequest<OnboardingRequestData, any>>(
    AsyncRequestNotStarted(),
  );

  const getPosts = async () => {
    setPosts(AsyncRequestLoading());
    await ProtectedApiClient.getOnboardingData()
      .then((res) => {
        setPosts(AsyncRequestCompleted(res));
      })
      .catch((error) => {
        setPosts(AsyncRequestFailed(error));
      });
  };

  const onFinish = async (values: OnboardingRequestData) => {
    setPost(AsyncRequestLoading());
    await ProtectedApiClient.postOnboardingForm(values)
      .then((res) => {
        setPost(AsyncRequestCompleted(res));
      })
      .catch((error) => {
        setPost(AsyncRequestFailed(error));
      });
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
          {asyncRequestIsComplete(post) && (
            <SuccessMessage>
              Success! Your favorite color is {post.result.favoriteColor}!
            </SuccessMessage>
          )}
        </FormCard>
        <StyledButton onClick={getPosts}>Get Posts</StyledButton>
        <ResponseContainer>
          {asyncRequestIsComplete(posts) &&
            posts.result.map(function (post, i) {
              return (
                <ResponseCard
                  id={post.id}
                  key={i}
                  title={post.title}
                  body={post.body}
                  userId={post.userId}
                />
              );
            })}
        </ResponseContainer>
      </Container>
    </>
  );
};

export default Onboarding;
