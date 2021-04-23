import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';
import { ContentContainer } from '../../components';
import { PrivilegeLevel } from '../../auth/ducks/types';
import { useDispatch, useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { getFullName, getPrivilegeLevel } from '../../auth/ducks/selectors';
import { getUserData } from '../../auth/ducks/thunks';

const { Title } = Typography;

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(state.authenticationState.tokens),
  );

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch, privilegeLevel])
  const name: string | undefined = useSelector((state: C4CState) =>
    getFullName(state.authenticationState.userData),
  );
  return (
    <>
      <Helmet>
        <title>Code4Community</title>
        <meta
          name="Homepage"
          content="Welcome to Code4Community's frontend scaffold!"
        />
      </Helmet>
      <ContentContainer>
        <Title>Hello, {name}</Title>
        <Title level={3}>Your privilege level is: {privilegeLevel}</Title>
      </ContentContainer>
    </>
  );
};

export default Home;
