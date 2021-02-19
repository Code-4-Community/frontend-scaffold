import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './App.less';
import Home from './containers/home/Home';
import Signup from './containers/signup/Signup';
import Login from './containers/login/Login';
import ForgotPassword from './containers/forgot-password/ForgotPassword';
import Settings from './containers/settings/Settings';
import ForgotPasswordReset from './containers/forgot-password/ForgotPasswordReset';

import NotFound from './containers/not-found/NotFound';
import NavBar from './components/navbar/NavBar';
import Footer from './components/Footer';
import { Layout } from 'antd';
import styled from 'styled-components';

const { Content } = Layout;

const AppInnerContainer = styled.div`
  min-height: 100vh;
`;

const App: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta
          name="keywords"
          content="C4C,code,for,community,code4community,codeforcommunity,northeastern,boston"
        />
      </Helmet>

      <Router>
        <Layout className="app-flex-container">
          <NavBar />
          <Content className="content-padding">
            <AppInnerContainer>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/forgot-password" exact component={ForgotPassword} />
                <Route path="/forgot-password-reset/:key" exact component={ForgotPasswordReset} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/settings" exact component={Settings} />
                <Route path="*" exact component={NotFound} />
              </Switch>
            </AppInnerContainer>
          </Content>
          <Footer />
        </Layout>
      </Router>
    </>
  );
};

export default App;
