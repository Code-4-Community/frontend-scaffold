import React, { useState } from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import styled from 'styled-components';
import { ResponseCard } from '../../components/onboarding';
import ProtectedApiClient, {
  GetResponseData,
  PostRequestData,
} from '../../api/protectedApiClient';
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

const Onboarding: React.FC = () => {
  const [createPostRequest, setCreatePostRequest] = useState<
    AsyncRequest<GetResponseData[], any>
  >(AsyncRequestNotStarted());
  const [getPostsRequest, setGetPostsRequest] = useState<
    AsyncRequest<PostRequestData, any>
  >(AsyncRequestNotStarted());

  const getPosts = async () => {
    setCreatePostRequest(AsyncRequestLoading());
    await ProtectedApiClient.getOnboardingData()
      .then((res) => {
        setCreatePostRequest(AsyncRequestCompleted(res));
      })
      .catch((error) => {
        setCreatePostRequest(AsyncRequestFailed(error));
      });
  };

  const onFinish = async (values: PostRequestData) => {
    setGetPostsRequest(AsyncRequestLoading());
    await ProtectedApiClient.postOnboardingForm(values)
      .then((res) => {
        setGetPostsRequest(AsyncRequestCompleted(res));
      })
      .catch((error) => {
        setGetPostsRequest(AsyncRequestFailed(error));
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
          <Paragraph>
            This is an example form card to create a getPostsRequest.
          </Paragraph>
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              label="User ID"
              name="userId"
              rules={[
                {
                  required: true,
                  message: 'Please input your user ID.',
                },
              ]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              label="Body"
              name="body"
              rules={[
                {
                  required: true,
                  message:
                    'Please input the body text of your getPostsRequest.',
                },
              ]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input the title of your getPostsRequest.',
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
          {asyncRequestIsComplete(getPostsRequest) && (
            <SuccessMessage>
              Successfully created getPostsRequest with title '
              {getPostsRequest.result.title}'!
            </SuccessMessage>
          )}
        </FormCard>
        <StyledButton onClick={getPosts}>Get Posts</StyledButton>
        <ResponseContainer>
          {asyncRequestIsComplete(createPostRequest) &&
            createPostRequest.result.map(function (getPostsRequest, i) {
              return (
                <ResponseCard
                  id={getPostsRequest.id}
                  key={i}
                  title={getPostsRequest.title}
                  body={getPostsRequest.body}
                  userId={getPostsRequest.userId}
                />
              );
            })}
        </ResponseContainer>
      </Container>
    </>
  );
};

export default Onboarding;
