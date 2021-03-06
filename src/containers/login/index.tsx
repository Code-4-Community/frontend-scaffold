import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Form, Input, Typography } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../auth/ducks/thunks';
import { connect, useDispatch } from 'react-redux';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { C4CState } from '../../store';
import {
  LoginRequest,
  PrivilegeLevel,
  UserAuthenticationReducerState,
} from '../../auth/ducks/types';
import { ContentContainer } from '../../components';
import { Routes } from '../../App';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';

const { Title, Paragraph } = Typography;

type LoginProps = UserAuthenticationReducerState;

const Login: React.FC<LoginProps> = ({ tokens }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values: LoginRequest): void => {
    dispatch(login(values));
  };

  if (getPrivilegeLevel(tokens) !== PrivilegeLevel.NONE) {
    history.push(Routes.HOME);
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <ContentContainer>
        <Title>Login</Title>
        <Form name="basic" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Paragraph>
            Need an account? Sign up{' '}
            <Link to={Routes.SIGNUP} component={Typography.Link}>
              here
            </Link>
            !
          </Paragraph>
          <Paragraph>
            Forgot your password? Click{' '}
            <Link
              to={Routes.FORGOT_PASSWORD_REQUEST}
              component={Typography.Link}
            >
              here
            </Link>{' '}
            to reset it.
          </Paragraph>
          {tokens.kind === AsyncRequestKinds.Failed && (
            <Paragraph>{tokens.error}</Paragraph>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ContentContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState): LoginProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(Login);
